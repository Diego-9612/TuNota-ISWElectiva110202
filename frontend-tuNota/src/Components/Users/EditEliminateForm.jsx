// src/components/Users/EditEliminateForm.jsx
import { useState, useEffect } from 'react';

const EditEliminateForm = ({ user, onSubmit, onCancel, loading }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        role: ''
    });

    const [errors, setErrors] = useState({});

    // Inicializar formulario con datos del usuario
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                lastname: user.lastname || '',
                email: user.email || '',
                phone: user.phone || '',
                role: user.roles?.[0]?.id || 'STUDENT'
            });
        }
    }, [user]);

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Nombre es requerido';
        if (!formData.lastname.trim()) newErrors.lastname = 'Apellido es requerido';

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!/^\d{7,15}$/.test(formData.phone)) {
            newErrors.phone = 'Teléfono inválido (7-15 dígitos)';
        }

        if (!formData.role) {
            newErrors.role = 'Debe seleccionar un rol';
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar error al cambiar
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Preparar datos para enviar (solo campos modificables)
        const userData = {
            name: formData.name,
            lastname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            roles: [formData.role]
        };

        onSubmit(userData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido *
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.lastname ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Rol *
                </label>
                <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.role ? 'border-red-500' : 'border-gray-300'
                        }`}
                >
                    <option value="ADMIN">Administrador</option>
                    <option value="TEACHER">Profesor</option>
                    <option value="STUDENT">Estudiante</option>
                </select>
                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>
        </form>
    );
};

export default EditEliminateForm;