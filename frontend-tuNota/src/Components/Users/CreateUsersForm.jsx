// src/Components/FormCreateUsers.jsx
import { useState } from "react";

const CreateUsersForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        role: "STUDENT", 
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Nombre es requerido";
        if (!formData.lastname.trim()) newErrors.lastname = "Apellido es requerido";

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Email inválido";
        }

        if (!/^\d{7,15}$/.test(formData.phone)) {
            newErrors.phone = "Teléfono inválido (7-15 dígitos)";
        }

        if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }

        if (!formData.role) {
            newErrors.role = "Debe seleccionar un rol";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Limpiar error al cambiar
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await onSubmit(formData);
            // Resetear formulario después de creación exitosa
            setFormData({
                name: "",
                lastname: "",
                email: "",
                phone: "",
                password: "",
                role: "STUDENT",
            });
        } catch (error) {
            setServerError(error.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Crear Nuevo Usuario
            </h2>

            {serverError && (
                <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-md">
                    {serverError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nombre *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="lastname"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Apellido *
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.lastname ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.lastname && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Correo Electrónico *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Teléfono *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.phone ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Contraseña *
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Rol *
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.role ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="ADMIN">Administrador</option>
                            <option value="TEACHER">Profesor</option>
                            <option value="STUDENT">Estudiante</option>
                        </select>
                        {errors.role && (
                            <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Creando...
                            </span>
                        ) : (
                            "Crear Usuario"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUsersForm;
