import { useState } from "react";
import axios from "axios";
import { Layout } from "../../../Components/Layout/Layout";

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
            <main className="flex flex-col items-center justify-center w-2/3 p-6 mx-auto space-y-4 text-orange-500 bg-white border rounded-lg shadow-md h-2/3">
                <span className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-black">CREA UN NUEVO CURSO</h2>
                <p className="text-xl font-medium">
                    Ingresa la información necesaria para crear un nuevo curso
                </p>
                </span>

                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6 bg-[#f3ead9] p-14 rounded-xl justify-center items-center">
                    <div className="w-full">
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full p-3 px-10 rounded-xl placeholder:text-orange-300 focus:border-orange-500"
                            placeholder="Ingresa el nombre del curso"
                        />
                        {validationErrors.nombre && (
                            <p className="mt-2 text-sm text-center text-red-500">{validationErrors.nombre}</p>
                        )}
                    </div>

                    <div className="w-full">
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full p-3 px-10 rounded-xl placeholder:text-orange-300 focus:border-orange-500 "
                            placeholder="Ingresa una descripcion del curso"
                        />
                        {validationErrors.descripcion && (
                            <p className="mt-2 text-sm text-center text-red-500">{validationErrors.descripcion}</p>
                        )}
                    </div>

                    <div className="w-full">
                        <input
                            type="number"
                            name="numero_horas"
                            value={formData.numero_horas}
                            onChange={handleChange}
                            className="w-full p-3 px-10 rounded-xl placeholder:text-orange-300 focus:border-orange-500"
                            placeholder="Ingresa el numero de horas que dura el curso"
                        />
                        {validationErrors.numero_horas && (
                            <p className="mt-2 text-sm text-center text-red-500">{validationErrors.numero_horas}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-1/3 px-4 py-3 font-bold text-white duration-100 bg-orange-500 rounded-lg hover:bg-orange-700"
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
