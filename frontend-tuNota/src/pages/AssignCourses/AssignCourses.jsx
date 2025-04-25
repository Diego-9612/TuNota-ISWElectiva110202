import { Layout } from "../../Components/Layout/Layout";
function AssignCourses() {
    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-3/4 space-y-5 bg-white">
            <h2 className="text-2xl font-bold">ASIGNAR CURSOS A PROFESORES</h2>
            <p className="text-base font-medium">Ingresa la informacion necesaria para crear un nuevo curso</p>
            </main>
        </Layout>
    )
}

export { AssignCourses };