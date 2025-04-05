import json
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from AppTuNota.models import Curso
from .serializers import curso_serializer

class CursoApiView(APIView):
    def post(self, request, *args, **kwargs):
        data={
            'nombre':request.data.get('nombre'),
            'descripcion': request.data.get('descripcion'),
            'numHoras': request.data.get('numHoras'),
        }
        serializador = curso_serializer(data = data)
        if serializador.is_valid():
            serializador.save()
            return Response(serializador.data, status=status.HTTP_201_CREATED)
        
        return Response(serializador.data, status=status.HTTP_400_BAD_REQUEST)

