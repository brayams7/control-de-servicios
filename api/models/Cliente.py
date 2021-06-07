from .baseModel import BaseModel
from django.db import models

class Cliente(BaseModel):
    nombre = models.CharField(max_length=50)
    apellidos = models.CharField(max_length=50)
    direccion = models.CharField(max_length=150)
    telefono = models.CharField(max_length=12)

    def __str__(self):
        return self.nombre + self.apellidos