from django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50) # 'potes', 'tortas', 'postres', etc.
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} - ${self.precio}"

class Pedido(models.Model):
    nombre_cliente = models.CharField(max_length=100)
    telefono = models.CharField(max_length=50)
    direccion = models.CharField(max_length=255)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    # --- NUEVOS CAMPOS DE PAGO ---
    metodo_pago = models.CharField(max_length=50, default='Efectivo')
    monto_con_que_paga = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    vuelto = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    # -----------------------------
    
    creado_el = models.DateTimeField(auto_now_add=True)
    impreso = models.BooleanField(default=False)

    def __str__(self):
        return f"Pedido #{self.id} - {self.nombre_cliente} ({self.metodo_pago})"

class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, related_name='items', on_delete=models.CASCADE)
    producto_nombre = models.CharField(max_length=100)
    cantidad = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    gustos = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.cantidad}x {self.producto_nombre} ({self.pedido.nombre_cliente})"