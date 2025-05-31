import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../../Components/Layout/Layout"; 
import { useNavigate } from "react-router-dom";

function ListCursosAsigPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCourses = () => {
        setLoading(true);
        // Obtenemos el token del localStorage
        const token = localStorage.getItem('token');
        if (!token) {
            setError("No estás autenticado");
            setLoading(false);
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/api/cursos/mis-cursos/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setCourses(response.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error al obtener los cursos asignados:", err);
            setError("No se pudo cargar la lista de cursos asignados. Inténtalo nuevamente.");
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCreateExam = (courseId) => {
        // Por ahora solo redirige a una página de creación de examen (que crearemos más adelante)
        navigate(`/crear-examen/${courseId}`);
    };

    if (loading) return <Layout><p className="text-center text-green-500">Cargando cursos asignados....</p></Layout>;
    if (error) return <Layout> <p className="text-center text-red-500">{error}</p></Layout>;

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-full max-w-4xl gap-5 p-6 mx-auto text-orange-500 bg-white border rounded-lg shadow-md">
                <span className="flex flex-col items-center justify-center gap-2">
                    <h2 className="text-3xl font-black">MIS CURSOS ASIGNADOS</h2>
                    <p className="text-xl font-medium">Lista de cursos asignados a tu perfil de profesor</p>
                </span>
                
                {courses.length === 0 ? (
                    <div className="w-full p-8 text-center rounded-lg bg-yellow-50">
                        <p className="text-xl font-semibold text-orange-700">No tienes cursos asignados actualmente</p>
                        <p className="mt-2 text-gray-600">Contacta al administrador para que te asignen cursos</p>
                    </div>
                ) : (
                    <ul className="flex flex-col w-full gap-4">
                        {courses.map((curso) => (
                            <li 
                                key={curso.id} 
                                className="flex flex-col w-full p-5 transition-all duration-300 shadow-sm bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl hover:shadow-md"
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-orange-700 uppercase">{curso.nombre}</h3>
                                        <span className="px-3 py-1 text-sm font-semibold text-white bg-orange-500 rounded-full">
                                            {curso.numero_horas} Horas
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{curso.descripcion}</p>
                                </div>
                                
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 border-2 border-dashed rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-600">Profesor ID: {curso.profesor}</span>
                                    </div>
                                    
                                    <button
                                        onClick={() => handleCreateExam(curso.id)}
                                        className="px-4 py-2 text-white duration-200 bg-green-600 rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    >
                                        Crear Examen
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                
                <div className="mt-6 text-sm text-center text-gray-500">
                    <p>Total de cursos asignados: {courses.length}</p>
                </div>
            </main>
        </Layout>
    );
}

export { ListCursosAsigPage };