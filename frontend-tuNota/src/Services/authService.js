import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Configuración global de Axios para incluir token en solicitudes
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        
        const formattedToken = token.startsWith('Bearer ') 
            ? token 
            : `Bearer ${token}`;
        
        config.headers.Authorization = formattedToken;
    }
    return config;
});

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { 
            email, 
            password 
        });
    
        let token = response.data.token;
        if (!token.startsWith('Bearer ')) {
            token = `Bearer ${token}`;
        }
        
        return {
            ...response.data,
            token
        };
    } catch (error) {
        throw error.response?.data || { message: 'Error de conexión' };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        
        let errorMessage = 'Error en el registro';
        
        if (error.response) {
            
            if (error.response.status === 400) {
                if (error.response.data.detail === "Email already registered") {
                    errorMessage = 'El correo electrónico ya está registrado';
                } else if (error.response.data.detail === "Invalid phone format") {
                    errorMessage = 'Formato de teléfono inválido';
                }
            } else {
                errorMessage = error.response.data?.detail || errorMessage;
            }
        }
        
        throw new Error(errorMessage);
    }
};