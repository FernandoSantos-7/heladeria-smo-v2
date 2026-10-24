import os
import textwrap
import mercadopago
from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from .models import Pedido
from .serializers import PedidoSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all().order_by('-creado_el')
    serializer_class = PedidoSerializer

    @action(detail=True, methods=['post'])
    def imprimir(self, request, pk=None):
        pedido = self.get_object()
        
        # Ancho fijo exacto para papel térmico de 80mm (32 caracteres)
        ANCHO_TICKET = 32
        separador = "=" * ANCHO_TICKET
        guiones = "-" * ANCHO_TICKET
        
        # Función auxiliar para ajustar textos largos al ancho del ticket sin pasarse
        def ajustar_texto(texto, prefix=""):
            # textwrap cuida que las líneas no superen el ancho del papel térmico
            lineas = textwrap.wrap(str(texto), width=ANCHO_TICKET - len(prefix))
            return "\n".join([f"{prefix}{linea}" for linea in lineas])

        # Armamos el texto del ticket con formato estricto de 32 columnas
        ticket_texto = f"""{separador}
         HELADERIA S&MO         
{separador}
Pedido Nro: {pedido.id}
Fecha: {pedido.creado_el.strftime('%d/%m/%Y %H:%M')}
Cliente: {pedido.nombre_cliente}
Teléfono: {pedido.telefono}
Dirección: {pedido.direccion}
{guiones}
DETALLE:
"""
        for item in pedido.items.all():
            linea_item = f"- {item.cantidad}x {item.producto_nombre} (${item.precio_unitario})"
            ticket_texto += f"{ajustar_texto(linea_item)}\n"
            if item.gustos:
                linea_gustos = f"Gustos: {item.gustos}"
                ticket_texto += f"{ajustar_texto(linea_gustos, prefix='  ')}\n"

        ticket_texto += f"""{guiones}
TOTAL: ${pedido.total}
Método de Pago: {pedido.metodo_pago}
"""
        if pedido.metodo_pago and pedido.metodo_pago.lower() == 'efectivo' and pedido.monto_con_que_paga:
            ticket_texto += f"Paga con: ${pedido.monto_con_que_paga}\n"
            if pedido.vuelto is not None:
                ticket_texto += f"Vuelto: ${pedido.vuelto}\n"

        ticket_texto += f"""{separador}
      ¡GRACIAS POR SU COMPRA!   
{separador}
\n\n\n
"""

        try:
            ruta_archivo = "ticket_temp.txt"
            with open(ruta_archivo, "w", encoding="latin-1") as archivo:
                archivo.write(ticket_texto)
            
            os.system(f"notepad /p {ruta_archivo}")
            
            pedido.impreso = True
            pedido.save()
            return Response({"status": "Impresión enviada con éxito"})
        except Exception as e:
            return Response({"error": str(e)}, status=500)


@api_view(['POST'])
def crear_preferencia_mp(request):
    try:
        sdk = mercadopago.SDK(settings.MP_ACCESS_TOKEN)

        data = request.data
        total_pedido = data.get('total', 0)

        preference_data = {
            "items": [
                {
                    "title": "Pedido Heladería S'MO",
                    "quantity": 1,
                    "currency_id": "ARS",
                    "unit_price": float(total_pedido)
                }
            ],
            "back_urls": {
                "success": "http://localhost:5173",
                "failure": "http://localhost:5173",
                "pending": "http://localhost:5173"
            }
        }

        preference_response = sdk.preference().create(preference_data)
        print("RESPUESTA CRUDA DE MERCADO PAGO:", preference_response)

        preference = preference_response.get("response", {})
        init_point = preference.get("init_point")

        return Response({
            "init_point": init_point
        })
    except Exception as e:
        print("ERROR EN DJANGO:", str(e))
        return Response({"error": str(e)}, status=500)