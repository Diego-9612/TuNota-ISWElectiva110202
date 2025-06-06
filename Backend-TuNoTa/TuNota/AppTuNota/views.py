import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from AppTuNota.models import Curso, Examen ,Nota
from AppTuNota.serializers import CursoSerializer, ExamenSerializer ,NotaSerializer 

# Vista para Curso 
class CursoApiView(APIView):
    def post(self, request, *args, **kwargs):
        data = {
            'nombre': request.data.get('nombre'),
            'descripcion': request.data.get('descripcion'),
            'numHoras': request.data.get('numHoras'),
        }
        serializador = CursoSerializer(data=data)
        if serializador.is_valid():
            serializador.save()
            return Response(serializador.data, status=status.HTTP_201_CREATED)
        
        return Response(serializador.data, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        lista_cursos = Curso.objects.all()
        serializador = CursoSerializer(lista_cursos, many=True)
        return Response(serializador.data, status=status.HTTP_200_OK)
    
    def put(self, request, pkid):
        micurso =Curso.objects.filter(id=pkid).update(
            nombre=request.data.get('nombre'),
            descripcion= request.data.get('descripcion'),
            numHoras= request.data.get('numHoras'),
        )

        return Response(micurso, status=status.HTTP_200_OK)
    
    def delete(self, request, pkid, *args, **kwargs):
        try:
            micurso = Curso.objects.get(id=pkid)
            micurso.delete()
            return Response({"message": "Curso eliminado exitosamente."}, status=status.HTTP_204_NO_CONTENT)
        except Curso.DoesNotExist:
            return Response({"error": "Curso no encontrado."}, status=status.HTTP_404_NOT_FOUND)
            

# Vista para Examen 
class ExamenApiView(APIView):

    def post(self, request, *args, **kwargs):
        data = {
            'tipo_examen': request.data.get('tipo_examen'),
            'fecha': request.data.get('fecha'),
            'curso': request.data.get('curso')  # debe ser el ID del curso
        }
        serializador = ExamenSerializer(data=data)
        if serializador.is_valid():
            serializador.save()
            return Response(serializador.data, status=status.HTTP_201_CREATED)
        return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        lista_examenes = Examen.objects.all()
        serializador = ExamenSerializer(lista_examenes, many=True)
        return Response(serializador.data, status=status.HTTP_200_OK)

    def put(self, request, pkid):
        try:
            examen = Examen.objects.get(id=pkid)
            examen.tipo_examen = request.data.get('tipo_examen')
            examen.fecha = request.data.get('fecha')
            examen.curso_id = request.data.get('curso')
            examen.save()
            serializador = ExamenSerializer(examen)
            return Response(serializador.data, status=status.HTTP_200_OK)
        except Examen.DoesNotExist:
            return Response({"error": "Examen no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pkid, *args, **kwargs):
        try:
            examen = Examen.objects.get(id=pkid)
            examen.delete()
            return Response({"message": "Examen eliminado exitosamente."}, status=status.HTTP_204_NO_CONTENT)
        except Examen.DoesNotExist:
            return Response({"error": "Examen no encontrado."}, status=status.HTTP_404_NOT_FOUND)


# vista Nota
class NotaApiView(APIView):

    def post(self, request, *args, **kwargs):
        data = {
            'calificacion': request.data.get('calificacion'),
            'usuario': request.data.get('usuario'),
            'examen': request.data.get('examen')
        }
        serializador = NotaSerializer(data=data)
        if serializador.is_valid():
            serializador.save()
            return Response(serializador.data, status=status.HTTP_201_CREATED)
        return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        notas = Nota.objects.all()
        serializador = NotaSerializer(notas, many=True)
        return Response(serializador.data, status=status.HTTP_200_OK)
