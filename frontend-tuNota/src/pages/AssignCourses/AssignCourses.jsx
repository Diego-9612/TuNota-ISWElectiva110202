import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../../Components/Layout/Layout";

function AssignCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Realizar la solicitud GET para obtener los cursos
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/cursos/`);
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

    if (loading) return <Layout><p className="text-center text-green-500">Cargando cursos....</p></Layout>;
    if (error) return <Layout> <p className="text-center text-red-500">{error}</p></Layout>;

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-2/3 gap-5 p-6 mx-auto text-orange-500 bg-white border rounded-lg shadow-md h-2/3">
                <span className="flex flex-col items-center justify-center gap-2">
                    <h2 className="text-3xl font-black">ASIGNAR UN CURSO</h2>
                    <p className="text-xl font-medium">Busca un curso y asignale un profesor </p>
                </span>
                {courses.length === 0 ? (
                    <p className="text-center text-red-500">No hay cursos disponibles</p>
                ) : (
                    <ul className="flex flex-col items-center justify-center w-full space-y-4">
                        {courses.map((curso) => (
                            <li key={curso.id} className="w-full flex items-center justify-between p-4 bg-[#f3ead9] shadow-sm rounded-xl">
                                <div>
                                    <p className="text-lg font-bold uppercase">{curso.nombre}</p>
                                    <p className="text-sm font-light">Descripcion: {curso.descripcion}</p>
                                    <p className="text-sm font-light">Duracion: {curso.numero_horas} Horas</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 text-white duration-100 bg-orange-500 rounded hover:bg-orange-700">
                                        Asignar
                                    </button>
                                    <button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                                        Actualizar Asignacion
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

export { AssignCourses };