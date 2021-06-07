from django.db import models
from rest_framework import serializers
from api.models.Producto import Producto, Existencia, Unidad_de_Medida, Categoria

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        exclude = ['state','created','modified']


    def create(self, validated_data):
        producto = super().create(validated_data)
        Existencia.objects.create(producto=producto)        
        return producto

class ProductListSerializer(serializers.ModelSerializer):
    existencia = serializers.IntegerField()
    class Meta:
        model = Producto
        exclude = ['state','created','modified','profile']
        depth=1

class UnidadDeMedidaListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidad_de_Medida
        exclude = ['state','created','modified']

class CategoriaListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        exclude = ['state','created','modified']