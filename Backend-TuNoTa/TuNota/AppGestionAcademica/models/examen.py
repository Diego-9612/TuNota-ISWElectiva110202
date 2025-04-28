from django.core.validators import MinLengthValidator
from django.db import models
from .curso import Curso

class Examen(models.Model):
    TIPOS = (
        ('Quiz', 'Quiz'),
        ('Trabajo', 'Trabajo'),
        ('Parcial', 'Parcial'),
    )

    curso = models.ForeignKey(Curso, related_name='examenes', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255, validators=[MinLengthValidator(5)])
    tipo = models.CharField('tipo', max_length=10, choices=TIPOS)
    descripcion = models.TextField(validators=[MinLengthValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'examenes'
        unique_together = ('curso', 'titulo')

    def __str__(self):
        return f"{self.titulo} - {self.curso.nombre}"
