import { Layout } from "../../Components/Layout/Layout";
import { SectionList } from "../../Components/SectionList/SectionList";
import ImgTunota from "../../assets/img/tunota.png";



function HomeStudentPage() {

    const userManagementItems = [
        { label: 'Crear Usuario', to: '/create-user' },
        { label: 'Buscar Usuarios', to: '/search-users' },
        { label: 'Editar Usuarios', to: '/edit-users' },
    ];

    const courseManagementItems = [
        { label: 'Crear Curso', to: '/create-courses' },
        { label: 'Asignar Curso', to: '/assign-courses' },
        { label: 'Editar o Eliminar Curso', to: '/edit-delete-courses' },
    ];

    const reportManagementItems = [
        { label: 'Generar Reporte', to: '/generate-report' },
        { label: 'Editar Perfil', to: '/edit-profile' },
        { label: 'Configuraciones', to: '/settings' },
    ];

    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-3/4 space-y-5 bg-white">
                <figure className="flex items-center justify-center w-full bg-[#f3ead9] rounded-xl">
                    <img
                        src={ImgTunota}
                        alt="tunota.com"
                        className="object-cover w-1/3"
                    />
                </figure>
                <section className="flex items-center justify-between w-full py-5 text-lg font-semibold">
                    <SectionList title="Gestión de Usuarios" items={userManagementItems} />
                    <SectionList title="Gestión de Materias" items={courseManagementItems} />
                    <SectionList title="Gestión de Reportes" items={reportManagementItems} />
                </section>
            </main>
        </Layout>
    );
}

export { HomeStudentPage };
