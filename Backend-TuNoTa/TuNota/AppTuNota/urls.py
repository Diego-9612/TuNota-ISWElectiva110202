from django.urls import path

from .views import CursoApiView

urlpatterns = [
    path ('crear', CursoApiView.as_view()),
]