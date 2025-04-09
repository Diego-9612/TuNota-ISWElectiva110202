from django.urls import path
from .views import CursoApiView, ExamenApiView  

urlpatterns = [
<<<<<<< HEAD
    path ('crear', CursoApiView.as_view()),
    path ('listar', CursoApiView.as_view()),
    path ('actualizar/<int:pkid>', CursoApiView.as_view(), name='actualizar_curso'),
    path ('eliminar/<int:pkid>', CursoApiView.as_view(), name='eliminar_vehiculo'),

]
=======
    path('crear', CursoApiView.as_view()),         # Ruta para crear Curso
    path('examenes/crear', ExamenApiView.as_view())  #  Ruta para crear Examen
]
>>>>>>> main
