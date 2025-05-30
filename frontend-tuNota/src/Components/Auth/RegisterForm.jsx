// src/Components/Auth/RegisterForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    // Validación de campos
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
        
        if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Limpiar error cuando el usuario corrige
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        
        // Validación
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        // Preparar datos para el backend
        const userData = {
            name: formData.name,
            lastname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        };
        
        try {
            await register(userData);
            // Redirección se maneja en el AuthContext después de registro exitoso
        } catch (error) {
            // Manejar errores específicos del backend
            if (error.response && error.response.data) {
                if (error.response.data.detail === "Email already registered") {
                    setServerError('El correo electrónico ya está registrado');
                } else {
                    setServerError(error.response.data.detail || 'Error en el registro');
                }
            } else {
                setServerError('Error de conexión con el servidor');
            }
        }
    };

    return (
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Registro de Estudiante
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Solo estudiantes pueden registrarse directamente
                </p>
            </div>
            
            {serverError && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md">
                    {serverError}
                </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                                errors.name ? 'border-red-300' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Nombre"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido
                        </label>
                        <input
                            id="lastname"
                            name="lastname"
                            type="text"
                            value={formData.lastname}
                            onChange={handleChange}
                            className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                                errors.lastname ? 'border-red-300' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Apellido"
                        />
                        {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname}</p>}
                    </div>
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="correo@ejemplo.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                        } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        placeholder="1234567890"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                                errors.password ? 'border-red-300' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Mínimo 6 caracteres"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`appearance-none rounded relative block w-full px-3 py-2 border ${
                                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                            } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            placeholder="Repite tu contraseña"
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Registrarse
                    </button>
                </div>
            </form>
            
            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    >
                        Inicia sesión
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;