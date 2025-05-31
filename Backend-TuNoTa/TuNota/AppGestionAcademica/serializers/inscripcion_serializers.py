# AppGestionAcademica/serializers/inscripcion_serializers.py
from rest_framework import serializers
from users.models import UserHasRoles
from AppGestionAcademica.models import Curso

class InscripcionSerializer(serializers.ModelSerializer):
    curso_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = UserHasRoles
        fields = ['curso_id']
        extra_kwargs = {
            'curso_id': {'required': True}
        }
    
    def validate_curso_id(self, value):
        if not Curso.objects.filter(id=value).exists():
            raise serializers.ValidationError("El curso especificado no existe")
        return value