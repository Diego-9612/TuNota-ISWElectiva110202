from rest_framework import serializers
from AppGestionAcademica.models import Examen

class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = '__all__'