from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CursoViewSet, ExamenViewSet, NotaViewSet

router = DefaultRouter()
router.register(r'cursos', CursoViewSet)
router.register(r'examenes', ExamenViewSet)
router.register(r'notas', NotaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]