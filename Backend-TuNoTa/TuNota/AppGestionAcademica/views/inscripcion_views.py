# AppGestionAcademica/views/inscripcion_views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from roles.models import Role
from users.models import UserHasRoles
from AppGestionAcademica.models import Curso
from AppGestionAcademica.serializers.inscripcion_serializers import InscripcionSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def inscribir_estudiante(request):
    # Verificar que el usuario es estudiante
    if not request.user.roles.filter(id='STUDENT').exists():
        return Response(
            {"error": "Solo los estudiantes pueden inscribirse en cursos"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = InscripcionSerializer(data=request.data)
    if serializer.is_valid():
        curso_id = serializer.validated_data['curso_id']
        
        # Verificar si el curso existe
        try:
            curso = Curso.objects.get(id=curso_id)
        except Curso.DoesNotExist:
            return Response(
                {"error": "El curso especificado no existe"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verificar si ya está inscrito
        if UserHasRoles.objects.filter(
            id_user=request.user, 
            id_rol__id=f'CURSO_{curso_id}'
        ).exists():
            return Response(
                {"error": "Ya estás inscrito en este curso"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Crear la "inscripción" como un rol especial
        try:
            # Crear o obtener el rol especial para el curso
            rol_curso, created = Role.objects.get_or_create(
                id=f'CURSO_{curso_id}',
                defaults={
                    'name': f'Estudiante Curso {curso.nombre}',
                    'route': f'/curso/{curso_id}'
                }
            )
            
            # Crear la relación de inscripción
            UserHasRoles.objects.create(
                id_user=request.user,
                id_rol=rol_curso
            )
            
            return Response(
                {"success": "Inscripción exitosa"}, 
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)