import { useState, useEffect } from "react";
import axios from "axios";
import { Layout } from "../../../Components/Layout/Layout";
import { EditCourses } from "../../../Components/EditCourses/EditCourses";

function EditDeleteCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditCourse, setShowEditCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);



    const fetchCourses = () => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/api/cursos/`)
            .then((response) => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al obtener los cursos:", err);
                setError("No se pudo cargar la lista de cursos. Inténtalo nuevamente.");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCourses();
    }, []);


    const handleEditCourse = () => {
        fetchCourses();
        setShowEditCourse(false);
    };

    const openEditModal = (course) => {
        setSelectedCourse(course);
        setShowEditCourse(true);
    }

    const handleDeleteCourse = (id) => {
        if(!window.confirm("¿Estas Seguro de que deseas eliminar este curso?")) return;

        axios.delete(`${import.meta.env.VITE_API_URL}/api/cursos/${id}/`)
        .then(() => {
            setCourses(courses.filter(course => course.id !== id));
        })
        .catch((error)=> {
            console.log("Error al eliminar el curso", error);
        });
    };


    if (loading) return <Layout><p className="text-center text-green-500">Cargando cursos....</p></Layout>;
    if (error) return <Layout> <p className="text-center text-red-500">{error}</p></Layout>;

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-2/3 gap-5 p-6 mx-auto text-orange-500 bg-white border rounded-lg shadow-md h-2/3">
                <span className="flex flex-col items-center justify-center gap-2">
                    <h2 className="text-3xl font-black">EDITA O ELIMINA CURSOS</h2>
                    <p className="text-xl font-medium">En la lista busca el curso a editar o eliminar </p>
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
                                    <button
                                        onClick={() => openEditModal(curso)}
                                        className="px-4 py-2 text-white duration-100 bg-orange-500 rounded hover:bg-orange-700">
                                        Editar
                                    </button>
                                    <button 
                                    onClick={()=> handleDeleteCourse(curso.id)}
                                    className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {showEditCourse && selectedCourse && (
                    <EditCourses
                        course={selectedCourse}
                        onClose={() => setShowEditCourse(false)}
                        onUpdateCourse={handleEditCourse} />
                )}
            </main>
        </Layout>
    );
}

export { EditDeleteCourses };
