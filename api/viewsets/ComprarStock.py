from django.core.files import File
from django.shortcuts import resolve_url
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db.models import F

from api.models.compra import Compra, Detalle_compra
from api.serializers.Compra_stock import CompraListSerializer, CompraSerializer, AgregarCompra

class CompraStockViewset(viewsets.ModelViewSet):
    queryset = Detalle_compra.objects.filter(state=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)

    def get_serializer_class(self):
        """Define serializer for API"""
        return AgregarCompra

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    def create(self, request, *args, **kwargs):
        data = request.data
        data['cantidad'] = int(data['cantidad'])
        data['sub_total'] = float(int(data['sub_total']))
        data['total'] = float(int(data['total']))
        
        producto = data['producto']

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'creado', 'se ha creado correctamente'}, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   