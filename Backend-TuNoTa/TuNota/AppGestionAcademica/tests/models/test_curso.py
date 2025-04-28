from django.test import TestCase
from AppGestionAcademica.models.curso import Curso
from django.core.exceptions import ValidationError

class CursoModelTest(TestCase):
    def test_crear_curso_valido(self):
        curso = Curso.objects.create(
            nombre="Matemáticas Avanzadas",
            descripcion="Curso completo de álgebra y cálculo diferencial.",
            numero_horas=50
        )
        self.assertEqual(curso.nombre, "Matemáticas Avanzadas")
        self.assertGreater(curso.numero_horas, 10)
        self.assertIsNotNone(curso.fecha_creacion)

    def test_nombre_corto_dispara_error(self):
        curso = Curso(
            nombre="Math",
            descripcion="Una descripción suficientemente larga",
            numero_horas=20
        )
        with self.assertRaises(ValidationError):
            curso.full_clean()

    def test_descripcion_corta_dispara_error(self):
        curso = Curso(
            nombre="Matemáticas",
            descripcion="Corta",
            numero_horas=20
        )
        with self.assertRaises(ValidationError):
            curso.full_clean()

    def test_numero_horas_invalido_dispara_error(self):
        curso = Curso(
            nombre="Física General",
            descripcion="Curso de física clásica y moderna.",
            numero_horas=5
        )
        with self.assertRaises(ValidationError):
            curso.full_clean()

    def test_string_representation(self):
        curso = Curso.objects.create(
            nombre="Química General",
            descripcion="Curso de química básica.",
            numero_horas=30
        )
        self.assertEqual(str(curso), "Química General")
