// src/Services/userService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const getAuthHeaders = (token) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

export const createUser = async (userData, token) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        let errorMessage = 'Error al crear el usuario';
        if (error.response) {
            if (error.response.status === 400) {
                if (error.response.data.email) {
                    errorMessage = 'El correo electrónico ya está registrado';
                } else if (error.response.data.phone) {
                    errorMessage = 'El teléfono ya está registrado';
                }
            } else {
                errorMessage = error.response.data?.detail || errorMessage;
            }
        }

        throw new Error(errorMessage);
    }
};

export const getAllUsers = async (token) => {
    try {
        const response = await axios.get(
            `${API_URL}/users`, 
            getAuthHeaders(token)
        );
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los usuarios: ' + (error.response?.data?.detail || error.message));
    }
};

    // Actualizar un usuario
export const updateUser = async (userId, userData, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/users/update/${userId}`,  // Ruta REST estándar
            userData,
            getAuthHeaders(token)
        );
        return response.data;
    } catch (error) {
        let errorMessage = 'Error al actualizar el usuario';

        if (error.response) {
            if (error.response.status === 400) {
                if (error.response.data.email) {
                    errorMessage = 'El correo electrónico ya está registrado';
                } else if (error.response.data.phone) {
                    errorMessage = 'El teléfono ya está registrado';
                }
            } else {
                errorMessage = error.response.data?.detail || errorMessage;
            }
        }
        throw new Error(errorMessage);
    }
};

    // Eliminar un usuario
export const deleteUser = async (userId, token) => {
    try {
        const response = await axios.delete(
            `${API_URL}/users/delete/${userId}`,  // Ruta REST estándar
            getAuthHeaders(token)
        );
        return response.data;
    } catch (error) {
        throw new Error('Error al eliminar el usuario: ' + (error.response?.data?.detail || error.message));
    }
};