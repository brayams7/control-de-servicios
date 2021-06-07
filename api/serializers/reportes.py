from rest_framework import serializers
from api.models import Producto

class ReportesVentaProductoSerializer(serializers.ModelSerializer):
    total_venta = serializers.FloatField()
    class Meta:
        model = Producto
        exclude = ['state','created','modified','description','image']
