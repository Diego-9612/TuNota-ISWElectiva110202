from django.db import models

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
