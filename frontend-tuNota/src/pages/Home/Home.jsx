import { NavLink } from "react-router-dom";
import { Layout } from "../../Components/Layout/Layout";
import ImgTunota from "../../assets/img/tunota.png";
function Home() {
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
                    <div className="flex flex-col items-center justify-center w-1/3 gap-2 p-5">
                        <p>Gestion de Usuarios</p>
                        <ul className="flex flex-col w-full gap-3 px-3 py-5 text-base font-light border border-black rounded-xl">
                            <li className="p-3 text-center rounded-xl bg-[#f3ead9]"><NavLink>Crear Usuario</NavLink></li>
                            <li className="p-3 text-center rounded-xl bg-[#f3ead9]"><NavLink>Buscar Usuarios</NavLink></li>
                            <li className="p-3 text-center rounded-xl bg-[#f3ead9]"><NavLink>Editar Usuarios</NavLink></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3 gap-2 p-5">
                        <p>Gestion de Materias</p>
                        <ul className="flex flex-col w-full gap-3 px-3 py-5 text-base font-light border border-black rounded-xl">
                            <li className="p-3 text-center rounded-xl bg-[#f3ead9]"><NavLink to={'/create-courses'}>Crear Curso</NavLink></li>
                            <li className="p-3 text-center rounded-xl bg-[#f3ead9]"><NavLink to={'/assign-courses'}>Asignar Curso</NavLink></li>
                            <li className="p-3 text-center rounded-xl bg-[#f3ead9]"><NavLink to={'edit-delete-courses'}>Editar/Eliminar Curso</NavLink></li>
                        </ul>

                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3 gap-2 p-5">
                        <p>Gestion de Reportes</p>
                        <ul className="flex flex-col w-full gap-3 px-3 py-5 text-base font-light border border-black rounded-xl">
                            <li className="p-3 text-center rounded-xl bg-[#f3ead9]"><NavLink>Generar Reporte</NavLink></li>
                            <li className="p-3 text-center rounded-xl bg-[#f3ead9]"><NavLink>Editar Perfil</NavLink></li>
                            <li className="p-3 text-center rounded-xl bg-[#f3ead9]"><NavLink>Configuraciones</NavLink></li>
                        </ul>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

export { Home };
