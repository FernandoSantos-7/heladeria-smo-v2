from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PedidoViewSet, crear_preferencia_mp

router = DefaultRouter()
router.register(r'pedidos', PedidoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('crear-preferencia/', crear_preferencia_mp, name='crear-preferencia'),
]