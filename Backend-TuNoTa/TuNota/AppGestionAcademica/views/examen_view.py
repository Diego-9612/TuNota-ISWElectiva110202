from rest_framework import viewsets

from AppGestionAcademica.models import Examen
from AppGestionAcademica.serializers import ExamenSerializer

class ExamenViewSet(viewsets.ModelViewSet):
    queryset = Examen.objects.all()
    serializer_class = ExamenSerializer