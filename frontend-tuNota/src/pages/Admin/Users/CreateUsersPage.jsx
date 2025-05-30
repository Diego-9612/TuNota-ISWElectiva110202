// src/Pages/PageCreateUsers.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/useAuth'; 
import CreateUsersForm from '../../../Components/Users/CreateUsersForm';
import { createUser } from '../../../Services/userService'; 
import { Layout } from '../../../Components/Layout/Layout';

const CreateUsersPage = () => {
    const { user, token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async (userData) => {
        setLoading(true);
        setSuccessMessage('');
            
            const payload = {
                name: userData.name,
                lastname: userData.lastname,
                email: userData.email,
                phone: userData.phone,
                password: userData.password,
                roles: [userData.role] 
            };

            await createUser(payload, token);
            setSuccessMessage('Usuario creado exitosamente!');

    };

    // Si el usuario no es admin, redirigir
    if (!user || user.roles[0].id !== 'ADMIN') {
        navigate('/');
        return null;
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Crear Nuevo Usuario
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Complete el formulario para registrar un nuevo usuario en el sistema
                    </p>
                </div>

                {successMessage && (
                    <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-green-400 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">{successMessage}</span>
                        </div>
                    </div>
                )}

                <CreateUsersForm onSubmit={handleCreateUser} loading={loading} />

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => navigate('/admin')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        Volver al panel
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default CreateUsersPage;