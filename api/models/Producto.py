from .baseModel import BaseModel
from django.db import models
from .profile import Profile

class Unidad_de_Medida(BaseModel):
    descripcion = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.descripcion

class Categoria(BaseModel):
    descripcion = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.descripcion

class Producto(BaseModel):
    name = models.CharField(max_length=100, blank=False, null=False)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    precio = models.FloatField( null=True)
    unidad_de_medida = models.ForeignKey(Unidad_de_Medida, on_delete=models.CASCADE)
    description = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to = "products/images", null=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class Existencia(BaseModel):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='existencia_producto')
    cantidad = models.IntegerField(default=0)
