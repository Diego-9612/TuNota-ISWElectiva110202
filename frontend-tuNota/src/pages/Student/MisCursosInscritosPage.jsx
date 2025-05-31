import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../../Components/Layout/Layout";

function MisCursosInscritosPage() {
    const [cursosInscritos, setCursosInscritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener cursos inscritos
    useEffect(() => {
        const fetchCursosInscritos = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/cursos/mis-inscripciones/`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setCursosInscritos(response.data);
            } catch (err) {
                console.error("Error al obtener cursos inscritos:", err);
                setError("No se pudo cargar la lista de cursos inscritos");
            } finally {
                setLoading(false);
            }
        };

        fetchCursosInscritos();
    }, []);

    if (loading) {
        return (
            <Layout>
                <p className="text-center text-green-500">Cargando cursos inscritos...</p>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <p className="text-center text-red-500">{error}</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-full max-w-4xl gap-5 p-6 mx-auto text-orange-500 bg-white border rounded-lg shadow-md">
                <span className="flex flex-col items-center justify-center gap-2">
                    <h2 className="text-3xl font-black">MIS CURSOS INSCRITOS</h2>
                    <p className="text-xl font-medium">Lista de cursos en los que estás inscrito</p>
                </span>

                {cursosInscritos.length === 0 ? (
                    <div className="w-full p-8 text-center rounded-lg bg-yellow-50">
                        <p className="text-xl font-semibold text-orange-700">No estás inscrito en ningún curso</p>
                        <p className="mt-2 text-gray-600">Visita la sección de cursos disponibles para inscribirte</p>
                    </div>
                ) : (
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                        {cursosInscritos.map((curso) => (
                            <div
                                key={curso.id}
                                className="flex flex-col w-full p-5 transition-all duration-300 shadow-sm bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl hover:shadow-md"
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-orange-700 uppercase">
                                            {curso.nombre}
                                        </h3>
                                        <span className="px-3 py-1 text-sm font-semibold text-white bg-orange-500 rounded-full">
                                            {curso.numero_horas} Horas
                                        </span>
                                    </div>
                                    <p className="text-gray-700">
                                        {curso.descripcion}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 border-2 border-dashed rounded-full"></div>
                                        <span className="text-sm font-medium text-gray-600">
                                            Profesor ID: {curso.profesor || "No asignado"}
                                        </span>
                                    </div>

                                    <div className="px-4 py-2 font-medium text-white bg-green-600 rounded cursor-default">
                                        Inscrito
                                    </div>
                                </div>

                                <div className="pt-3 mt-4 text-sm border-t">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="font-medium text-gray-700">Fecha de inscripción:</p>
                                            <p className="text-gray-600">
                                                {curso.fecha_creacion
                                                    ? new Date(curso.fecha_creacion).toLocaleDateString()
                                                    : "N/A"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">Última actualización:</p>
                                            <p className="text-gray-600">
                                                {curso.updated_at
                                                    ? new Date(curso.updated_at).toLocaleDateString()
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6 text-sm text-center text-gray-500">
                    <p>Total de cursos inscritos: {cursosInscritos.length}</p>
                </div>
            </main>
        </Layout>
    );
}

export { MisCursosInscritosPage };