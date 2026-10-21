from rest_framework import serializers
from .models import Producto, Pedido, DetallePedido

class DetallePedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallePedido
        fields = ['producto_nombre', 'cantidad', 'precio_unitario', 'gustos']

class PedidoSerializer(serializers.ModelSerializer):
    items = DetallePedidoSerializer(many=True)

    class Meta:
        model = Pedido
        fields = [
            'id', 'nombre_cliente', 'telefono', 'direccion', 
            'total', 'metodo_pago', 'monto_con_que_paga', 'vuelto', 
            'items', 'creado_el', 'impreso'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        pedido = Pedido.objects.create(**validated_data)
        for item_data in items_data:
            DetallePedido.objects.create(pedido=pedido, **item_data)
        return pedido