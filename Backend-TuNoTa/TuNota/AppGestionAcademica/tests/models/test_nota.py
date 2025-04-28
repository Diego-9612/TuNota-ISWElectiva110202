from django.test import TestCase
from AppGestionAcademica.models.curso import Curso
from AppGestionAcademica.models.examen import Examen
from AppGestionAcademica.models.nota import Nota
from django.core.exceptions import ValidationError

class NotaModelTest(TestCase):
    def setUp(self):
        self.curso = Curso.objects.create(
            nombre="Programación Avanzada",
            descripcion="Curso de programación en Python avanzado.",
            numero_horas=60
        )
        self.examen = Examen.objects.create(
            curso=self.curso,
            titulo="Examen de Python",
            tipo="Parcial",
            descripcion="Examen sobre programación avanzada en Python."
        )

    def test_crear_nota_valida(self):
        nota = Nota.objects.create(
            examen=self.examen,
            valor=85.50,
            comentario="Buen desempeño" 
        )
        self.assertEqual(nota.valor, 85.50)
        self.assertEqual(nota.comentario, "Buen desempeño")  

    def test_valor_negativo_dispara_error(self):
        nota = Nota(
            examen=self.examen,
            valor=-10.00,
            comentario="Valor negativo no permitido"
        )
        with self.assertRaises(ValidationError):
            nota.full_clean()  # Valida los datos antes de guardar

    def test_string_representation(self):
        nota = Nota.objects.create(
            examen=self.examen,
            valor=95.00
        )
        
        self.assertEqual(str(nota), "Nota 95.00 para Examen de Python")
