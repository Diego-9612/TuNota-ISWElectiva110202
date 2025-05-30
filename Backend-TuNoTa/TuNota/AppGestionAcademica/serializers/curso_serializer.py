from rest_framework import serializers
from AppGestionAcademica.models import Curso
from users.models import User

class CursoSerializer(serializers.ModelSerializer):
    profesor = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        allow_null=True,
        required=False
    )
    class Meta:
        model = Curso
        fields = '__all__'