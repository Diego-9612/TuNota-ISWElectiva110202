from django.core.exceptions import ValidationError
from django.db import models
from .examen import Examen

def validateValorNota(value):
    if value < 0:
        raise ValidationError('El valor de la nota no puede ser un número negativo')

class Nota(models.Model):
    examen = models.ForeignKey(Examen, related_name='notas', on_delete=models.CASCADE)
    valor = models.DecimalField(max_digits=5, decimal_places=2, validators=[validateValorNota])
    comentario = models.TextField(blank=True, null=True)
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'notas'

    def __str__(self):
        return f"Nota {self.valor} para {self.examen.titulo}"

