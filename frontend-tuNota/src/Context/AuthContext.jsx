import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../Services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

  // Cargar datos del usuario desde localStorage al inicio
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch (e) {
                console.error("Error parsing stored user data", e);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

  // Función para login
    const login = async (email, password) => {
        const data = await loginUser(email, password);

    // Extraer solo el token sin "Bearer "
        const cleanToken = data.token.startsWith("Bearer ")
        ? data.token.split(" ")[1]
        : data.token;

        setUser(data.user);
        setToken(cleanToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", cleanToken);

        // Redirigir según rol
        if (data.user.roles && data.user.roles.length > 0) {
            const roleRoute = data.user.roles[0].route;
            navigate(roleRoute || "/");
        } else {
            navigate("/");
        }
        return data;
    };

  // Función para registro
    const register = async (userData) => {
        const data = await registerUser(userData);
        navigate("/login");
        return data;
    };

  // Función para logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

  // Valores expuestos por el contexto
    const value = {
        user,
        token,
        login,
        loading,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
