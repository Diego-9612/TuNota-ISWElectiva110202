from rest_framework import serializers
from .models import Curso, Examen

# Serializador de Curso 
class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ['id', 'nombre', 'descripcion', 'numHoras']

# Serializador de Examen 
class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = ['id', 'tipo_examen', 'fecha', 'curso']
