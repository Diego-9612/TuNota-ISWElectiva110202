import { useState } from "react";
import axios from "axios";
import { Layout } from "../../Components/Layout/Layout";

function CreateCourses({ onAddCurso }) {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        numero_horas: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const validateForm = () => {
        const errors = {};

        if (formData.nombre.trim().length < 5) {
            errors.nombre = "El nombre debe tener al menos 5 caracteres.";
        }

        if (formData.descripcion.trim().length < 10) {
            errors.descripcion = "La descripción debe tener al menos 10 caracteres.";
        }

        const horas = parseInt(formData.numero_horas);
        if (isNaN(horas) || horas <= 0) {
            errors.numero_horas = "El número de horas debe ser un número positivo.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Limpiar errores cuando se modifica un campo
        if (validationErrors[name]) {
            setValidationErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage("");

        if (!validateForm()) return;

        setLoading(true);

        const dataToSend = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            numero_horas: parseInt(formData.numero_horas),
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/cursos/`, dataToSend);
            setSuccessMessage("Curso creado exitosamente.");
            setFormData({ nombre: "", descripcion: "", numero_horas: "" });
            if (onAddCurso) onAddCurso(); // Callback opcional
        } catch (err) {
            console.error("Error al crear un nuevo curso:", err);
            setError("No se pudo crear el curso. Inténtalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-3/4 p-6 mx-auto space-y-5 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">CREAR UN NUEVO CURSO</h2>
                <p className="text-base font-medium">
                    Ingresa la información necesaria para crear un nuevo curso.
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div>
                        <label className="block font-medium">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {validationErrors.nombre && (
                            <p className="text-sm text-red-500">{validationErrors.nombre}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Descripción</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {validationErrors.descripcion && (
                            <p className="text-sm text-red-500">{validationErrors.descripcion}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Número de Horas</label>
                        <input
                            type="number"
                            name="numero_horas"
                            value={formData.numero_horas}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {validationErrors.numero_horas && (
                            <p className="text-sm text-red-500">{validationErrors.numero_horas}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        {loading ? "Creando..." : "Crear Curso"}
                    </button>

                    {error && <p className="mt-2 text-red-600">{error}</p>}
                    {successMessage && <p className="mt-2 text-green-600">{successMessage}</p>}
                </form>
            </main>
        </Layout>
    );
}

export { CreateCourses };
