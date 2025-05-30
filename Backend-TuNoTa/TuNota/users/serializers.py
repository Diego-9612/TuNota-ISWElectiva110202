from roles.models import Role
from rest_framework import serializers # type: ignore
from .models import User
import bcrypt; # type: ignore

class UserSerializer(serializers.ModelSerializer):
    roles = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False,
        allow_empty=False,  # Nueva validación
        error_messages={
            'empty': 'Debe proporcionar al menos un rol válido.',
            'invalid': 'El formato de roles es incorrecto.'
        }
    )

    class Meta:
        model = User
        fields = ['id', 'name', 'lastname', 'email', 'phone', 'password', 'notification_token', 'roles']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_roles(self, value):
        """Validación personalizada para el campo roles"""
        
        if len(value) == 0:
            raise serializers.ValidationError("Debe asignar al menos un rol.")
        return value

    def create(self, validated_data):

        roles_provided = 'roles' in self.initial_data
        
    
        roles_data = validated_data.pop('roles', None)

        
        raw_password = validated_data.pop('password')
        hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())
        validated_data['password'] = hashed_password.decode('utf-8')
        
        # Crear usuario
        user = User.objects.create(**validated_data)

        
        if roles_data is not None:
            
            for role_id in roles_data:
                role = Role.objects.get(id=role_id)
                user.roles.add(role)
        else:
            
            try:
                student_role = Role.objects.get(id='STUDENT')
                user.roles.add(student_role)
            except Role.DoesNotExist:
                raise serializers.ValidationError(
                    {"roles": "Configuración de roles incompleta: rol STUDENT no existe"}
                )

        return user