from rest_framework import serializers
from AppGestionAcademica.models import Examen
from AppGestionAcademica.models import Curso
from rest_framework.exceptions import ValidationError

class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = '__all__'
        extra_kwargs = {
            'curso': {'required': True},
            'titulo': {'required': True},
            'tipo': {'required': True},
        }

    def validate_curso(self, value):
        """Valida que el curso exista"""
        if not Curso.objects.filter(id=value.id).exists():
            raise ValidationError("El curso especificado no existe")
        return value