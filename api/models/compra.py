from .baseModel import BaseModel
from django.db import models
from .Producto import Producto
    

class Compra(BaseModel):
    fecha_emitida = models.DateField(auto_now_add=True)
    total = models.FloatField()

    def __str__(self):
        return self.fecha_emitida

class Detalle_compra(BaseModel):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='detalle_compra_producto')
    compra = models.ForeignKey(Compra, on_delete=models.CASCADE, related_name='detalle_compra_compra')
    cantidad = models.IntegerField()
    sub_total = models.FloatField()