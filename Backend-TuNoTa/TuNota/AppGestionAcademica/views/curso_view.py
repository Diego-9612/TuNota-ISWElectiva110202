from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from AppGestionAcademica.models import Curso
from AppGestionAcademica.serializers import CursoSerializer
from roles.models import Role  
from users.models import UserHasRoles  
from rest_framework.permissions import IsAuthenticated

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='mis-cursos')
    def mis_cursos(self, request):
        cursos = Curso.objects.filter(profesor=request.user)
        serializer = self.get_serializer(cursos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='mis-inscripciones')
    def mis_inscripciones(self, request):
        if not request.user.roles.filter(id='STUDENT').exists():
            return Response(
                {"error": "Solo los estudiantes pueden ver sus inscripciones"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Obtener todos los roles de curso del estudiante
        roles_curso = Role.objects.filter(
            id__startswith='CURSO_',
            userhasroles__id_user=request.user
        )
        
        
        curso_ids = []
        for rol in roles_curso:
            try:
                
                curso_id = int(rol.id.split('_')[1])
                curso_ids.append(curso_id)
            except (IndexError, ValueError):
                
                continue
        
        
        cursos = Curso.objects.filter(id__in=curso_ids)
        
        serializer = self.get_serializer(cursos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    