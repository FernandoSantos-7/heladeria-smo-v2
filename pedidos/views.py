from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Pedido
from .serializers import PedidoSerializer
import os

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