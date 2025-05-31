import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../../Components/Layout/Layout";
import { CrearExamenModal } from "../../Components/CrearExamen/CrearExamenModal"; 

function ListCursosAsigPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [exams, setExams] = useState({}); // { courseId: [examenes] }
    const [formData, setFormData] = useState({
        titulo: '',
        tipo: 'Quiz',
        descripcion: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchCourses = () => {
        setLoading(true);
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

    const fetchExamsForCourse = (courseId) => {
        const token = localStorage.getItem('token');
        axios.get(`${import.meta.env.VITE_API_URL}/api/examenes/?curso=${courseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setExams(prev => ({
                ...prev,
                [courseId]: response.data
            }));
        })
        .catch(err => {
            console.error(`Error cargando exámenes para el curso ${courseId}:`, err);
        });
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const openCreateExamModal = (courseId) => {
        setSelectedCourseId(courseId);
        setShowModal(true);
        
        // Cargar exámenes existentes para este curso
        if (!exams[courseId]) {
            fetchExamsForCourse(courseId);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCourseId(null);
        setFormData({
            titulo: '',
            tipo: 'Quiz',
            descripcion: ''
        });
        setFormErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Limpiar error si existe
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: null
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem('token');
        
        // Validar formulario
        const errors = {};
        if (!formData.titulo.trim()) errors.titulo = "El título es obligatorio";
        if (!formData.tipo) errors.tipo = "Selecciona un tipo de examen";
        if (!formData.descripcion.trim()) errors.descripcion = "La descripción es obligatoria";
        
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setIsSubmitting(false);
            return;
        }

        // Enviar datos
        axios.post(`${import.meta.env.VITE_API_URL}/api/examenes/`, 
            {
                ...formData,
                curso: selectedCourseId
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            // Agregar el nuevo examen a la lista de exámenes del curso
            setExams(prev => ({
                ...prev,
                [selectedCourseId]: [...(prev[selectedCourseId] || []), response.data]
            }));
            
            // Cerrar modal y resetear formulario
            closeModal();
        })
        .catch(err => {
            console.error("Error creando examen:", err);
            if (err.response) {
                // Mostrar errores del servidor
                if (err.response.data) {
                    setFormErrors({ submit: err.response.data });
                } else {
                    setFormErrors({ submit: "Error al crear el examen. Inténtalo de nuevo." });
                }
            } else {
                setFormErrors({ submit: "Error de conexión" });
            }
        })
        .finally(() => {
            setIsSubmitting(false);
        });
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
                                        onClick={() => openCreateExamModal(curso.id)}
                                        className="px-4 py-2 text-white duration-200 bg-green-600 rounded hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    >
                                        Crear Examen
                                    </button>
                                </div>
                                
                                {/* Lista de exámenes para este curso */}
                                {(exams[curso.id] && exams[curso.id].length > 0) && (
                                    <div className="pt-3 mt-4 border-t">
                                        <h4 className="mb-2 font-bold text-gray-700">Exámenes creados:</h4>
                                        <ul className="space-y-2">
                                            {exams[curso.id].map(examen => (
                                                <li key={examen.id} className="flex items-start p-2 bg-white rounded shadow-sm">
                                                    <div className="flex-1">
                                                        <p className="font-semibold">{examen.titulo}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
                                                                {examen.tipo}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {new Date(examen.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{examen.descripcion}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
                
                <div className="mt-6 text-sm text-center text-gray-500">
                    <p>Total de cursos asignados: {courses.length}</p>
                </div>
                
                {/* Modal para crear examen */}
                <CrearExamenModal 
                    show={showModal} 
                    onClose={closeModal}
                    title="Crear Nuevo Examen"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {formErrors.submit && (
                            <p className="p-2 text-center text-red-500 rounded bg-red-50">{formErrors.submit}</p>
                        )}
                        
                        <div>
                            <label htmlFor="titulo" className="block mb-1 font-medium text-gray-700">
                                Título del examen
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                id="titulo"
                                value={formData.titulo}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${formErrors.titulo ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Ej: Examen Parcial 1"
                            />
                            {formErrors.titulo && <p className="mt-1 text-sm text-red-500">{formErrors.titulo}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="tipo" className="block mb-1 font-medium text-gray-700">
                                Tipo de examen
                            </label>
                            <select
                                name="tipo"
                                id="tipo"
                                value={formData.tipo}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${formErrors.tipo ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="Quiz">Quiz</option>
                                <option value="Trabajo">Trabajo</option>
                                <option value="Parcial">Parcial</option>
                            </select>
                            {formErrors.tipo && <p className="mt-1 text-sm text-red-500">{formErrors.tipo}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="descripcion" className="block mb-1 font-medium text-gray-700">
                                Descripción
                            </label>
                            <textarea
                                name="descripcion"
                                id="descripcion"
                                rows="3"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${formErrors.descripcion ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Describe el contenido del examen..."
                            ></textarea>
                            {formErrors.descripcion && <p className="mt-1 text-sm text-red-500">{formErrors.descripcion}</p>}
                        </div>
                        
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={isSubmitting}
                                className="px-4 py-2 font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creando...
                                    </span>
                                ) : "Crear Examen"}
                            </button>
                        </div>
                    </form>
                </CrearExamenModal>
            </main>
        </Layout>
    );
}

export { ListCursosAsigPage };