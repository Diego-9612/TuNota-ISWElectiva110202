from AppTuNota.models import Curso
from rest_framework import serializers

class curso_serializer (serializers.ModelSerializer):
    
    class Meta: 
        model = Curso
        fields = ['id', 'nombre', 'descripcion', 'numHoras']