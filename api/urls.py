from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets

#mis viewsets

router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'producto', viewsets.ProductoViewset)
router.register(r'categoria', viewsets.CategoriaViewset)
router.register(r'unidad_de_medida', viewsets.UnidadDeMedidaViewset)
router.register(r'compra_stock', viewsets.CompraStockViewset)
router.register(r'cliente', viewsets.ClienteViewset)
router.register(r'reportes', viewsets.ReportesViewset)

urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
