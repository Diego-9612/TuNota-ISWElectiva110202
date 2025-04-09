import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from AppTuNota.models import Curso, Examen
from AppTuNota.serializers import CursoSerializer, ExamenSerializer  # Usa los nombres correctos

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
        return Response(serializador.errors, status=status.HTTP_400_BAD_REQUEST)

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
