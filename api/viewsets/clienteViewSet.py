from django.shortcuts import resolve_url
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db.models import F

from api.models import Cliente, Detalle_Venta, Existencia
from api.serializers.cliente import  CompraSerializer

class ClienteViewset(viewsets.ModelViewSet):
    queryset = Cliente.objects.filter(state=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)

    def get_serializer_class(self):
        """Define serializer for API"""
        return  CompraSerializer 

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == 'create':
            permission_classes = [IsAuthenticated | AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]
    
    def create(self, request, *args, **kwargs):
        data_cliente = None
        productosCarrito = []
        totalPagar = None

        try:

            data_cliente = request.data
            productosCarrito = data_cliente.get('productosCarrito')
            totalPagar = float(data_cliente.get('totalPagar'))
            del data_cliente['productosCarrito']
            del data_cliente['totalPagar']

        except:
            return Response({'ocurrió un error':'error'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=data_cliente)
        if serializer.is_valid():
            venta = serializer.save()
            
            for producto in productosCarrito:
                producto['cantidad'] = int(producto['cantidad'])
                producto['precio'] = float(producto['precio'])
                producto['sub_total'] = float(producto['sub_total'])

                
                Detalle_Venta.objects.create(
                    producto_id= int(producto['id']),
                    venta = venta,
                    cantidad = producto['cantidad'],
                    sub_total = producto['sub_total']
                    )
                existencia_producto = get_object_or_404(Existencia,producto_id = int(producto['id']))
                existencia_producto.cantidad -= producto['cantidad']
                existencia_producto.save()

            venta.total = totalPagar
            venta.save()

            print(venta)
            return Response({'creado', 'se ha creado correctamente'}, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)