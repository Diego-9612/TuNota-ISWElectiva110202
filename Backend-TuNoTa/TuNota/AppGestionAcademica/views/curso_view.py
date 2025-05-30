from rest_framework import viewsets

from AppGestionAcademica.models import Curso
from AppGestionAcademica.serializers import CursoSerializer
from rest_framework.permissions import IsAuthenticated

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated] 