from api.models.Cliente import Cliente
from .baseModel import BaseModel
from django.db import models
from .Producto import Producto


class Venta(BaseModel):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='venta_cliente', null=True)
    fecha_emitida = models.DateField(auto_now_add=True)
    total = models.FloatField()

    def __str__(self):
        return self.cliente.nombre

class Detalle_Venta(BaseModel):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='detalle_venta_producto')
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name='detalle_venta_venta', null=True)
    cantidad = models.PositiveSmallIntegerField()
    sub_total = models.FloatField()