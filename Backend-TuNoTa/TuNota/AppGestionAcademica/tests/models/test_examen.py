from django.test import TestCase
from AppGestionAcademica.models.curso import Curso
from AppGestionAcademica.models.examen import Examen
from django.core.exceptions import ValidationError

class ExamenModelTest(TestCase):
    def setUp(self):
        self.curso = Curso.objects.create(
            nombre="Biología Molecular",
            descripcion="Curso sobre biología molecular y genética.",
            numero_horas=40
        )

    def test_crear_examen_valido(self):
        examen = Examen.objects.create(
            curso=self.curso,
            titulo="Examen Parcial 1",
            tipo="Parcial",
            descripcion="Evaluación parcial de contenidos iniciales."
        )
        self.assertEqual(examen.titulo, "Examen Parcial 1")
        self.assertEqual(examen.tipo, "Parcial")
        self.assertIsNotNone(examen.created_at)

    def test_titulo_corto_dispara_error(self):
        examen = Examen(
            curso=self.curso,
            titulo="Exa",
            tipo="Quiz",
            descripcion="Descripción válida"
        )
        with self.assertRaises(ValidationError):
            examen.full_clean()

    def test_descripcion_corta_dispara_error(self):
        examen = Examen(
            curso=self.curso,
            titulo="Evaluación Final",
            tipo="Trabajo",
            descripcion="Cort"
        )
        with self.assertRaises(ValidationError):
            examen.full_clean()

    def test_string_representation(self):
        examen = Examen.objects.create(
            curso=self.curso,
            titulo="Evaluación Final",
            tipo="Trabajo",
            descripcion="Descripción larga."
        )
        self.assertEqual(str(examen), "Evaluación Final - Biología Molecular")
