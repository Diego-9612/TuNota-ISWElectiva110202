import { useState } from "react";
import axios from "axios";
function EditCourses({ course, onClose, onUpdateCourse }) {

    const [formData, setFormData] = useState({
        nombre: course.nombre,
        descripcion: course.descripcion,
        numero_horas: course.numero_horas,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (formData.nombre.trim().length < 5) {
            newErrors.nombre = "El nombre debe tener al menos 5 caracteres.";
        }

        if (formData.descripcion.trim().length < 10) {
            newErrors.descripcion = "La descripción debe tener al menos 10 caracteres.";
        }

        const horas = parseInt(formData.numero_horas);
        if (isNaN(horas) || horas <= 0) {
            newErrors.numero_horas = "El número de horas debe ser un número positivo.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await axios.put('${import.meta.env.VITE_API_URL}/cursos/${course.id}/', formData)
            onUpdateCourse(formData);
            onClose();
        } catch (err) {
            console.error("Error al crear un nuevo curso:", err);
            setErrors("No se pudo crear el curso. Inténtalo nuevamente.");
        }
    };

    return (

        <main className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <section className="w-1/2 px-16 py-10 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-3xl font-black text-center text-orange-500">Editar Curso</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full p-3 px-10 border border-orange-300 rounded-xl placeholder:text-orange-300"
                            placeholder="Ingresa el nombre del curso"
                        />
                        {errors.nombre && (
                            <p className="mt-2 text-sm text-center text-red-500">{errors.nombre}</p>
                        )}
                    </div>
                    <div className="w-full">
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full p-3 px-10 border border-orange-300 rounded-xl placeholder:text-orange-300 "
                            placeholder="Ingresa una descripcion del curso"
                        />
                        {errors.descripcion && (
                            <p className="mt-2 text-sm text-center text-red-500">{errors.descripcion}</p>
                        )}
                    </div>
                    <div className="w-full">
                        <input
                            type="number"
                            name="numero_horas"
                            value={formData.numero_horas}
                            onChange={handleChange}
                            className="w-full p-3 px-10 border border-orange-300 rounded-xl placeholder:text-orange-300"
                            placeholder="Ingresa el numero de horas que dura el curso"
                        />
                        {errors.numero_horas && (
                            <p className="mt-2 text-sm text-center text-red-500">{errors.numero_horas}</p>
                        )}
                    </div>
                    <div className="flex justify-center space-x-2">
                        <button type="button" onClick={onClose} className="w-1/3 px-4 py-3 font-bold text-white duration-100 bg-orange-500 rounded-lg hover:bg-orange-700">Cancelar</button>
                        <button
                            type="submit"
                            className="w-1/3 px-4 py-3 font-bold text-white duration-100 bg-orange-500 rounded-lg hover:bg-orange-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>

            </section>
        </main>

    );
}

export { EditCourses };