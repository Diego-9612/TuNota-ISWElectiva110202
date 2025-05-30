from django.urls import path
from .views import delete_user, update, get_user_by_id, get_all_user, update_user, get_profesores

urlpatterns = [
    # Rutas específicas primero
    path('profesores/', get_profesores, name='profesores-list'),
    path('findById/<id_user>/', get_user_by_id),
    path('delete/<id_user>/', delete_user),
    path('update/<id_user>/', update_user),
    
    # Rutas genéricas después
    path('<id_user>/', update),
    
    # Ruta raíz
    path('', get_all_user),
]