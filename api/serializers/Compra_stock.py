from django.db import models
from rest_framework import serializers

from api.models import Existencia

from api.models.compra import Compra, Detalle_compra
from django.shortcuts import get_object_or_404

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        exclude = ['state','created','modified']

class CompraListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        exclude = ['state','created','modified']
        depth = 1

#serializador de la compra
class AgregarCompra(serializers.ModelSerializer):
    total = serializers.FloatField()
    #excluimos la compra porque el la funcion create la creammos
    class Meta:
        model = Detalle_compra
        fields = ['sub_total','total','cantidad','producto']
    
    #creamos tanto la compra como el detalle de la compra
    def create(self, validated_data):
        nueva_compra = Compra.objects.create(total = validated_data['total'])
        validated_data.pop('total')

        detalle_compra = Detalle_compra.objects.create(producto = validated_data['producto'],
                                cantidad = validated_data['cantidad'],
                                sub_total=validated_data['sub_total'],
                                compra_id = nueva_compra.id
                                )
        print(detalle_compra)
        existenciaProducto = get_object_or_404(Existencia, producto_id = detalle_compra.producto.id)
        existenciaProducto.cantidad += validated_data['cantidad']
        existenciaProducto.save()

        return detalle_compra
        