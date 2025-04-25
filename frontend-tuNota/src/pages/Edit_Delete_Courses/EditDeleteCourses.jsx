import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../../Components/Layout/Layout";

function EditDeleteCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Realizar la solicitud GET para obtener los cursos
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/curso/listar`);
                setCourses(response.data); // Aquí guardas los cursos recibidos
            } catch (err) {
                console.error("Error al obtener los cursos:", err);
                setError("No se pudo cargar la lista de cursos. Inténtalo nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses(); // Llamamos a la función para obtener los cursos
    }, []); // Esto se ejecuta solo una vez al montar el componente

    if (loading) return <p className="text-center text-green-500">Cargando cursos....</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-3/4 space-y-5 bg-white">
                <h2 className="text-2xl font-bold">EDITA O ELIMINA CURSOS</h2>
                <p className="text-base font-medium">En la lista busca el curso a editar o eliminar </p>
                {courses.length === 0 ? (
                    <p className="text-center text-red-500">No hay cursos disponibles</p>
                ) : (
                    <ul className="space-y-4">
                        {courses.map((curso) => (
                            <li key={curso.id} className="flex items-center justify-between p-4 border shadow-sm rounded-xl">
                                <div>
                                    <p className="text-lg font-semibold">{curso.nombre}</p>
                                    <p className="font-semibold text-gray-600">{curso.descripcion}</p>
                                    <p className="font-semibold text-gray-600">{curso.numHoras}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600">
                                        Editar
                                    </button>
                                    <button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </Layout>
    );
}

export { EditDeleteCourses };
