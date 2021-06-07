from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import F, Sum, Avg
from api.models import Venta, Producto

from api.serializers.reportes import ReportesVentaProductoSerializer

class ReportesViewset(viewsets.ModelViewSet):
    queryset = Venta.objects.filter(state=True)

    def get_serializer_class(self):
        """Define serializer for API"""
        return None

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def totalVentaProducto(self, request, *args, **kwargs):
        vendedor = request.user.profile
        ventas_producto = Producto.objects.filter(profile = vendedor).annotate(total_venta = Sum('detalle_venta_producto__sub_total'))
        
        queryset = self.filter_queryset(ventas_producto)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ReportesVentaProductoSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ReportesVentaProductoSerializer(queryset, many=True)

        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def totalVentaGlobal(self, request, *args, **kwargs):
        total_venta = Venta.objects.aggregate(total_venta = Sum('total'))
        print(total_venta)
        return Response({
            'total_venta':total_venta['total_venta']
        }, status = status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def promedioPrecios(self, request, *args, **kwargs):
        vendedor = request.user.profile
        promedio = Producto.objects.filter(profile = vendedor).aggregate(promedio_precios = Avg('precio'))
        print(promedio)
        return Response({
            'promedio_precios':promedio['promedio_precios']
        }, status = status.HTTP_200_OK)
    
    