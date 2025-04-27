from rest_framework import viewsets

from AppGestionAcademica.models import Curso
from AppGestionAcademica.serializers import CursoSerializer

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer