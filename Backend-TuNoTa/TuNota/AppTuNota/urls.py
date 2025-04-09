from django.urls import path
from .views import CursoApiView, ExamenApiView  

urlpatterns = [
    path('crear', CursoApiView.as_view()),         # Ruta para crear Curso
    path('examenes/crear', ExamenApiView.as_view())  #  Ruta para crear Examen
]
