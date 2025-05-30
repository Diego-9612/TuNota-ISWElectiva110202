from django.urls import path
from .views import delete_user, update, get_user_by_id, get_all_user, update_user

urlpatterns = [
    path('/<id_user>', update),
    path('/findById/<id_user>', get_user_by_id),
    path('/', get_all_user),
    path('/delete/<id_user>', delete_user),
    path('/update/<id_user>', update_user),
    #path('/upload/<id_user>', ),
    #path('/login', login)
]