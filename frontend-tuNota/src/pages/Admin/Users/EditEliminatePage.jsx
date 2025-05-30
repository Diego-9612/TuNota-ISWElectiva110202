// src/pages/Admin/Users/EditEliminatePage.jsx
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../Context/useAuth'; 
import { getAllUsers, deleteUser, updateUser } from '../../../Services/userService';
import EditUserModal from '../../../Components/Mod/EditUsersModal';
import { Layout } from '../../../Components/Layout/Layout';

// Componente para mostrar un grupo de usuarios por rol
const UserRoleGroup = ({ roleName, users, onEdit, onDelete }) => {
    const roleLabel = {
        ADMIN: 'Administradores',
        TEACHER: 'Profesores',
        STUDENT: 'Estudiantes'
    }[roleName] || roleName;

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {roleLabel} <span className="text-gray-500">({users.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map(user => (
                    <div key={user.id} className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-gray-900">{user.name} {user.lastname}</h3>
                                <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                                <p className="text-sm text-gray-500">{user.phone}</p>
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onEdit(user)}
                                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-full"
                                    title="Editar usuario"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => onDelete(user.id)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-full"
                                    title="Eliminar usuario"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {user.roles?.[0]?.name || 'Sin rol'}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                                ID: {user.id}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EditEliminatePage = () => {
    const { user: currentUser, token } = useAuth();
    const [users, setUsers] = useState([]);
    const [groupedUsers, setGroupedUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Agrupar usuarios por rol
    const groupUsersByRole = useCallback((usersList) => {
        const grouped = {
            ADMIN: [],
            TEACHER: [],
            STUDENT: []
        };

        usersList.forEach(user => {
            const roleId = user.roles?.[0]?.id;
            if (roleId && grouped[roleId]) {
                grouped[roleId].push(user);
            }
        });

        return grouped;
    }, []);

    // Cargar usuarios
    const loadUsers = useCallback(async () => {
        try {
            setLoading(true);
            const usersData = await getAllUsers(token);
            setUsers(usersData);
            setGroupedUsers(groupUsersByRole(usersData));
        } catch (err) {
            setError('Error al cargar usuarios: ' + err.message);
            console.error("Detalles del error:", err);
        } finally {
            setLoading(false);
        }
    }, [token, groupUsersByRole]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    // Manejar edición de usuario
    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Manejar guardar cambios
    const handleSaveUser = async (updatedData) => {
        try {
            setIsSaving(true);
            await updateUser(selectedUser.id, updatedData, token);
            await loadUsers(); // Recargar lista de usuarios
            setIsModalOpen(false);
        } catch (err) {
            setError('Error al actualizar usuario: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    // Manejar eliminación de usuario
    const handleDeleteUser = async (userId) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            setLoading(true);
            await deleteUser(userId, token);
            await loadUsers(); // Recargar lista de usuarios
        } catch (err) {
            setError('Error al eliminar usuario: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Verificar si el usuario actual es admin
    if (!currentUser || currentUser.roles?.[0]?.id !== 'ADMIN') {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto py-8 px-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    No tienes permiso para acceder a esta página. Solo los administradores pueden gestionar usuarios.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Administra todos los usuarios del sistema
                        </p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">
                            Total: {users.length} usuarios
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    {error}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <div>
                        <UserRoleGroup
                            roleName="ADMIN"
                            users={groupedUsers.ADMIN || []}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteUser}
                        />

                        <UserRoleGroup
                            roleName="TEACHER"
                            users={groupedUsers.TEACHER || []}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteUser}
                        />

                        <UserRoleGroup
                            roleName="STUDENT"
                            users={groupedUsers.STUDENT || []}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteUser}
                        />
                    </div>
                )}

                <EditUserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={selectedUser}
                    onSave={handleSaveUser}
                    loading={isSaving}
                />
            </div>
        </Layout>
    );
};

export default EditEliminatePage;