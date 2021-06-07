from django.db import models

class Rol(models.Model):
    descripcion = models.CharField(max_length=50, unique=True)
    state = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.descripcion