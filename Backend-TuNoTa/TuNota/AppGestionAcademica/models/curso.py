from django.db import models

from django.core.validators import MinLengthValidator
from django.core.exceptions import ValidationError


def validateNumeroHoras(value):
    value
    if value <= 10:
        raise ValidationError('El número de horas debe ser mayor o igual a 10.')
    if value <= 0:
        raise ValidationError('El número de horas no puede ser negativo.')


class Curso(models.Model):
    nombre = models.CharField(max_length=255, unique=True, validators=[MinLengthValidator(5)])
    descripcion = models.TextField(validators=[MinLengthValidator(10)])
    numero_horas = models.IntegerField(validators=[validateNumeroHoras])
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'cursos'

    def __str__(self):
        return self.nombre