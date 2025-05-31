import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../../Components/Layout/Layout";

function InscribirCursosPage() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inscripcionError, setInscripcionError] = useState(null);
    const [inscripcionSuccess, setInscripcionSuccess] = useState(false);
    const [cursosInscritos, setCursosInscritos] = useState(new Set());

    // Obtener cursos disponibles
    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/cursos/`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setCursos(response.data);
            } catch (err) {
                console.error("Error al obtener cursos:", err);
                setError("No se pudo cargar la lista de cursos disponibles");
            } finally {
                setLoading(false);
            }
        };

        fetchCursos();
    }, []);

    // Abrir modal con curso seleccionado
    const abrirModalInscripcion = (curso) => {
        // Verificar si ya está inscrito
        if (cursosInscritos.has(curso.id)) return;

        setCursoSeleccionado(curso);
        setShowModal(true);
        setInscripcionError(null);
        setInscripcionSuccess(false);
    };

    // Cerrar modal
    const cerrarModal = () => {
        setShowModal(false);
        setCursoSeleccionado(null);
    };

    // Manejar inscripción a curso
    const handleInscripcion = async () => {
        if (!cursoSeleccionado || cursosInscritos.has(cursoSeleccionado.id)) return;

        setIsSubmitting(true);
        setInscripcionError(null);

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/inscripciones/`,
                { curso_id: cursoSeleccionado.id },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Agregar curso a la lista de inscritos
            setCursosInscritos(prev => new Set(prev).add(cursoSeleccionado.id));

            setInscripcionSuccess(true);
            // Cerrar automáticamente después de 2 segundos
            setTimeout(() => {
                setShowModal(false);
                setInscripcionSuccess(false);
            }, 2000);
        } catch (err) {
            console.error("Error en inscripción:", err);
            setInscripcionError(
                err.response?.data?.detail ||
                "Error al inscribirse. Inténtalo nuevamente."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <p className="text-center text-green-500">Cargando cursos disponibles...</p>
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
                    <h2 className="text-3xl font-black">CURSOS DISPONIBLES</h2>
                    <p className="text-xl font-medium">Lista de cursos disponibles para inscripción</p>
                </span>

                {cursos.length === 0 ? (
                    <div className="w-full p-8 text-center rounded-lg bg-yellow-50">
                        <p className="text-xl font-semibold text-orange-700">No hay cursos disponibles en este momento</p>
                        <p className="mt-2 text-gray-600">Vuelve a revisar más tarde</p>
                    </div>
                ) : (
                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                        {cursos.map((curso) => {
                            const estaInscrito = cursosInscritos.has(curso.id);

                            return (
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
                                        <p className="text-gray-700 line-clamp-2">
                                            {curso.descripcion}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gray-200 border-2 border-dashed rounded-full"></div>
                                            <span className="text-sm font-medium text-gray-600">
                                                Profesor ID: {curso.profesor}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => abrirModalInscripcion(curso)}
                                            disabled={estaInscrito}
                                            className={`px-4 py-2 text-white duration-200 rounded focus:ring-2 focus:ring-opacity-50 ${estaInscrito
                                                    ? "bg-gray-400 cursor-not-allowed"
                                                    : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                                                }`}
                                        >
                                            {estaInscrito ? "Inscrito" : "Inscribirme"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-6 text-sm text-center text-gray-500">
                    <p>Total de cursos disponibles: {cursos.length}</p>
                    <p>Cursos inscritos: {cursosInscritos.size}</p>
                </div>

                {/* Modal de Inscripción */}
                {showModal && cursoSeleccionado && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-orange-700">
                                    {cursoSeleccionado.nombre}
                                </h3>
                                <button
                                    onClick={cerrarModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="font-medium text-gray-700">Descripción:</p>
                                    <p className="text-gray-600">{cursoSeleccionado.descripcion}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium text-gray-700">Duración:</p>
                                        <p className="text-gray-600">{cursoSeleccionado.numero_horas} horas</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-700">Fecha de creación:</p>
                                        <p className="text-gray-600">
                                            {new Date(cursoSeleccionado.fecha_creacion).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {inscripcionError && (
                                    <div className="p-2 text-center text-red-500 rounded bg-red-50">
                                        {inscripcionError}
                                    </div>
                                )}

                                {inscripcionSuccess ? (
                                    <div className="p-3 text-center text-green-700 bg-green-100 rounded">
                                        ¡Inscripción exitosa! Redirigiendo...
                                    </div>
                                ) : (
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            onClick={cerrarModal}
                                            className="px-4 py-2 font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleInscripcion}
                                            disabled={isSubmitting || cursosInscritos.has(cursoSeleccionado.id)}
                                            className={`px-4 py-2 font-medium text-white rounded-md ${isSubmitting || cursosInscritos.has(cursoSeleccionado.id)
                                                    ? "bg-green-400"
                                                    : "bg-green-600 hover:bg-green-700"
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Procesando...
                                                </span>
                                            ) : cursosInscritos.has(cursoSeleccionado.id) ? "Inscrito" : "Confirmar Inscripción"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
}

export { InscribirCursosPage };