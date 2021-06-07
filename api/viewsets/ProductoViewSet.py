from django import conf
from rest_framework.generics import get_object_or_404
from api import serializers
import json
from django.core.files import File 
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db.models import F
from api.models.Producto import Categoria, Producto, Existencia, Unidad_de_Medida
from api.serializers.producto import CategoriaListSerializer, ProductListSerializer, ProductSerializer, UnidadDeMedidaListSerializer

class ProductoViewset(viewsets.ModelViewSet):
    queryset =Producto.objects.annotate(existencia = F('existencia_producto__cantidad')).filter(state=True).order_by('categoria__descripcion')
    
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name", "description")
    search_fields = ("name", "categoria__descripcion")
    ordering_fields = ("categoria__descripcion",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductListSerializer
        else:
            return ProductSerializer

    def list(self, request, *args, **kwargs):
        
        if request.user.is_authenticated:
            #productos que no son mios y que las existencias sean mayor a 1
            profile = request.user.profile
            productos = Producto.objects.exclude(profile=profile).annotate(existencia = F('existencia_producto__cantidad')).filter(state=True, existencia_producto__cantidad__gte = 1).order_by('categoria__descripcion')
        else:
            productos = Producto.objects.annotate(existencia = F('existencia_producto__cantidad')).filter(state=True, existencia_producto__cantidad__gte = 1).order_by('categoria__descripcion')

        queryset = self.filter_queryset(productos)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProductListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProductListSerializer(queryset, many=True)

        return Response(serializer.data)

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "list":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    #modificar el metodo de list para no listar mi catalogo

    @action(detail=False, methods=['get'])
    def miCatalogo(self, request, *args, **kwargs):
        profile = request.user.profile
        productos = self.queryset.filter(profile=profile)

        queryset = self.filter_queryset(productos)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ProductListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProductListSerializer(queryset, many=True)

        return Response(serializer.data)
    
    @action(detail = False, methods=['post'])
    def comprobarExistencias(self, request, *args, **kwargs):
        id_producto = int(request.data)
        existencia_producto = get_object_or_404(Existencia, producto_id = id_producto)
        if existencia_producto.cantidad != 0:
            return Response(
                {'exito':'producto agregado'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error':'No hay existencias'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def create(self, request, *args, **kwargs):
        usuario = request.user.profile
        print('toda la data',request.data)
        data = json.loads(request.data['data'])
        data['profile'] = usuario.id
        data['precio'] = float(int(data['precio']))

        image = request.data.get('image')
        print('data',data)

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            if not image:
                serializer.save()
                return Response({'creado', 'se ha creado correctamente'}, status=status.HTTP_201_CREATED)

            else:
                producto = Producto.objects.create(
                    name = data.get('name'),
                    description = data.get('description'),
                    unidad_de_medida_id = data.get('unidad_de_medida'),
                    categoria_id = data.get('categoria'),
                    precio = data.get('precio'),
                    image = File(image),
                    profile = usuario
                )
                Existencia.objects.create(producto=producto)

                return Response({'creado', 'se ha creado correctamente'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        usuario = request.user.profile
        data = json.loads(request.data['data'])
        data['profile'] = usuario.id
        data['precio'] = float(int(data['precio']))
        
        image = request.data.get('image')
        
        instance = self.get_object()

        serializer = self.get_serializer(data=data)

        if serializer.is_valid():
            if instance:
                if instance.image is not None and image is not None:
                    instance.image.delete()
                
                print(type(data.get('name')))
                instance.name = data.get('name'),
                instance.description = data.get('description', instance.description),
                instance.precio = data.get('precio', instance.precio)
                instance.unidad_de_medida__id = data.get('unidad_de_medida', instance.unidad_de_medida_id),
                
                instance.categoria__id = data.get('categoria', instance.categoria),

                if image is not None:
                    print(1)
                    instance.image = File(image)
                instance.save()

                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error':'no existe el producto'}, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({'ok':'eliminado correctamente'}, status=status.HTTP_200_OK)



class CategoriaViewset(viewsets.ModelViewSet):
    queryset = Categoria.objects.filter(state=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("descripcion",)
    search_fields = ("descripcion",)

    def get_serializer_class(self):
        """Define serializer for API"""
        return CategoriaListSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class UnidadDeMedidaViewset(viewsets.ModelViewSet):
    queryset = Unidad_de_Medida.objects.filter(state=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("descripcion",)
    search_fields = ("descripcion",)

    def get_serializer_class(self):
        """Define serializer for API"""
        return UnidadDeMedidaListSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]