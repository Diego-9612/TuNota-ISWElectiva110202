# AppGestionAcademica/views/examen_views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from AppGestionAcademica.models import Examen, Curso
from AppGestionAcademica.serializers import ExamenSerializer
from users.models import User

class ExamenViewSet(viewsets.ModelViewSet):
    queryset = Examen.objects.all()
    serializer_class = ExamenSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Verificar que el curso exista
        curso_id = request.data.get('curso')
        if not curso_id:
            return Response(
                {"error": "El campo 'curso' es obligatorio"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            curso = Curso.objects.get(id=curso_id)
        except Curso.DoesNotExist:
            return Response(
                {"error": f"No se encontró un curso con ID {curso_id}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verificar que el usuario autenticado sea el profesor del curso
        if curso.profesor != request.user:
            return Response(
                {"error": "No tienes permiso para crear exámenes en este curso"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Crear el examen
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)