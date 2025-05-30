import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../../../Components/Layout/Layout";

function AssignCourses() {
    const [courses, setCourses] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedProfessor, setSelectedProfessor] = useState('');
    const [modalError, setModalError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Obtener token de autenticación
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener cursos
                const cursosResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/cursos/`,
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }
                );
                setCourses(cursosResponse.data);
                
                // Obtener profesores
                const profesoresResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/profesores/`,
                    {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    }
                );
                setProfesores(profesoresResponse.data);
            } catch (err) {
                console.error("Error al obtener los datos:", err);
                setError("No se pudo cargar la información necesaria. Inténtalo nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const openModal = (curso) => {
        setSelectedCourse(curso);
        // Si el curso ya tiene profesor asignado, lo preseleccionamos
        if (curso.profesor) {
            setSelectedProfessor(curso.profesor.id || curso.profesor);
        } else {
            setSelectedProfessor('');
        }
        setModalError('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
        setSelectedProfessor('');
    };

    const handleAssignProfessor = async () => {
        if (!selectedProfessor) {
            setModalError('Por favor selecciona un profesor');
            return;
        }

        setIsSubmitting(true);
        setModalError('');
        
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/cursos/${selectedCourse.id}/`,
                { profesor: selectedProfessor },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                }
            );

            // Actualizar el curso en el estado local
            setCourses(courses.map(course => 
                course.id === selectedCourse.id ? response.data : course
            ));
            closeModal();
        } catch (err) {
            console.error("Error al asignar profesor:", err);
            setModalError('Error al asignar profesor. Por favor, intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Layout><p className="text-center text-green-500">Cargando....</p></Layout>;
    if (error) return <Layout> <p className="text-center text-red-500">{error}</p></Layout>;

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-2/3 gap-5 p-6 mx-auto text-orange-500 bg-white border rounded-lg shadow-md min-h-[70vh]">
                <span className="flex flex-col items-center justify-center gap-2">
                    <h2 className="text-3xl font-black">ASIGNAR UN CURSO</h2>
                    <p className="text-xl font-medium">Busca un curso y asignale un profesor </p>
                </span>
                
                {courses.length === 0 ? (
                    <p className="text-center text-red-500">No hay cursos disponibles</p>
                ) : (
                    <ul className="flex flex-col items-center justify-center w-full space-y-4">
                        {courses.map((curso) => {
                            // Buscar datos completos del profesor si es necesario
                            const profesorCompleto = curso.profesor && typeof curso.profesor === 'object' 
                                ? curso.profesor
                                : profesores.find(p => p.id === curso.profesor);
                            
                            return (
                                <li key={curso.id} className="w-full flex items-center justify-between p-4 bg-[#f3ead9] shadow-sm rounded-xl">
                                    <div>
                                        <p className="text-lg font-bold uppercase">{curso.nombre}</p>
                                        <p className="text-sm font-light">Descripción: {curso.descripcion}</p>
                                        <p className="text-sm font-light">Duración: {curso.numero_horas} Horas</p>
                                        
                                        {/* Mostrar profesor asignado o mensaje si no hay */}
                                        <p className="text-sm font-medium">
                                            Profesor: {profesorCompleto
                                                ? `${profesorCompleto.name} ${profesorCompleto.lastname}` 
                                                : curso.profesor
                                                    ? 'Profesor no encontrado'
                                                    : <span className="text-red-500">No asignado</span>}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => openModal(curso)}
                                            className="px-4 py-2 text-white duration-100 bg-orange-500 rounded hover:bg-orange-700"
                                        >
                                            {curso.profesor ? 'Actualizar Asignación' : 'Asignar'}
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {/* Modal para asignar profesor */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="p-6 bg-white rounded-lg shadow-xl w-96">
                            <h3 className="text-xl font-bold">
                                {selectedCourse.profesor 
                                    ? `Actualizar profesor de ${selectedCourse.nombre}`
                                    : `Asignar profesor a ${selectedCourse.nombre}`}
                            </h3>
                            
                            {modalError && <p className="mt-2 text-red-500">{modalError}</p>}
                            
                            <div className="mt-4">
                                <label className="block mb-2 text-gray-700">
                                    Selecciona un profesor:
                                </label>
                                <select
                                    value={selectedProfessor}
                                    onChange={(e) => setSelectedProfessor(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">-- Seleccione un profesor --</option>
                                    {profesores.map(prof => (
                                        <option key={prof.id} value={prof.id}>
                                            {prof.name} {prof.lastname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="flex justify-end mt-6 space-x-3">
                                <button
                                    onClick={closeModal}
                                    disabled={isSubmitting}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleAssignProfessor}
                                    disabled={isSubmitting}
                                    className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
}

export { AssignCourses };