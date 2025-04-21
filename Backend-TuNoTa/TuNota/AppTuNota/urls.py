from django.urls import path
from .views import CursoApiView, ExamenApiView ,NotaApiView

urlpatterns = [
    # CURSO
    path('crear', CursoApiView.as_view()),
    path('listar', CursoApiView.as_view()),
    path('actualizar/<int:pkid>/', CursoApiView.as_view(), name='actualizar_curso'),
    path('eliminar/<int:pkid>/', CursoApiView.as_view(), name='eliminar_curso'),

    # EXAMEN
    path('examen/crear', ExamenApiView.as_view(), name='crear_examen'),
    path('examen/listar', ExamenApiView.as_view(), name='listar_examenes'),
    path('examen/actualizar/<int:pkid>/', ExamenApiView.as_view(), name='actualizar_examen'),
    path('examen/eliminar/<int:pkid>/', ExamenApiView.as_view(), name='eliminar_examen'), 

    # Nota 
    path('nota/crear', NotaApiView.as_view(), name='crear_nota'),
    path('nota/listar', NotaApiView.as_view(), name='listar_notas'),
]

