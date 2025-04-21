from django.db import models
from django.contrib.auth.models import User  #  modelo si es que usaremos el User como usuarios hasta mientras

# Modelo curso
class Curso(models.Model):
    nombre = models.CharField(max_length=25)
    descripcion = models.CharField(max_length=50)
    numHoras = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.nombre

#  Modelo:Examen
class Examen(models.Model):
    tipo_examen = models.CharField(max_length=100)
    fecha = models.DateField()
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.tipo_examen} - {self.curso.nombre}"

# Modelo:nota
class Nota(models.Model):
    calificacion = models.FloatField()
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    examen = models.ForeignKey(Examen, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.usuario.username} - {self.examen.tipo_examen} : {self.calificacion}"