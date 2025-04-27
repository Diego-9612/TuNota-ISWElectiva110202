from rest_framework import viewsets

from AppGestionAcademica.models import Nota
from AppGestionAcademica.serializers import NotaSerializer

class NotaViewSet(viewsets.ModelViewSet):
    queryset = Nota.objects.all()
    serializer_class = NotaSerializer