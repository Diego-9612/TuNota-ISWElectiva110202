from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from AppGestionAcademica.models import Curso
from AppGestionAcademica.serializers import CursoSerializer
from rest_framework.permissions import IsAuthenticated

class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    permission_classes = [IsAuthenticated] 


    # Nueva acción para obtener cursos del profesor autenticado
    @action(detail=False, methods=['get'], url_path='mis-cursos')
    def mis_cursos(self, request):
        
        cursos = Curso.objects.filter(profesor=request.user)
        
        serializer = self.get_serializer(cursos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)