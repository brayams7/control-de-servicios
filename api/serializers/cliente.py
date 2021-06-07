from rest_framework import serializers
from api.models import Cliente, Venta

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        exclude = ['state','created','modified']

    def create(self, validated_data):
        cliente = super().create(validated_data)
        venta = Venta.objects.create(cliente = cliente, total = 0.0)
        return venta

class CompraListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        exclude = ['state','created','modified']
        depth = 1
    