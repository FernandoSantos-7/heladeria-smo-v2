import os
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
        
        # Armamos el texto del ticket incluyendo pago y vuelto
        ticket_texto = f"""
================================
          HELADERIA S&MO        
================================
Pedido Nro: {pedido.id}
Fecha: {pedido.creado_el.strftime('%d/%m/%Y %H:%M')}
Cliente: {pedido.nombre_cliente}
Teléfono: {pedido.telefono}
Dirección: {pedido.direccion}
--------------------------------
DETALLE:
"""
        for item in pedido.items.all():
            ticket_texto += f"- {item.cantidad}x {item.producto_nombre} (${item.precio_unitario})\n"
            if item.gustos:
                ticket_texto += f"  Gustos: {item.gustos}\n"

        ticket_texto += f"""--------------------------------
TOTAL: ${pedido.total}
Método de Pago: {pedido.metodo_pago}
"""
        if pedido.metodo_pago and pedido.metodo_pago.lower() == 'efectivo' and pedido.monto_con_que_paga:
            ticket_texto += f"Paga con: ${pedido.monto_con_que_paga}\n"
            if pedido.vuelto is not None:
                ticket_texto += f"Vuelto: ${pedido.vuelto}\n"

        ticket_texto += f"""================================
      ¡GRACIAS POR SU COMPRA!   
================================
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