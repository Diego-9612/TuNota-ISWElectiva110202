import { Layout } from "../../Components/Layout/Layout";
import { NavLink } from "react-router-dom";
import ImgTunota from "../../assets/img/tunota.png";
function WelcomePage() {
    return (
        <Layout>
            <main className="flex flex-col items-center justify-center w-3/4 h-auto mt-12">
                <section className="flex items-center justify-center w-full gap-6">
                    <div className="flex flex-col items-center justify-center w-1/2 gap-6">
                        <h2 className="text-5xl font-bold text-center text-orange-500">Bienvenido a nuestra aplicación <br/>
                            ¡comienza ahora!
                        </h2>
                        <p className="text-xl font-medium text-center text-gray-500">
                            Nuestra aplicación te ofrece una experiencia única y personalizada. Conéctate fácilmente y descubre todas las funcionalidades que tenemos para ti.
                        </p>
                        <div className="flex items-center justify-center gap-5">
                            <span className="px-6 py-2 text-center text-white transition duration-300 ease-in-out bg-orange-500 rounded-xl hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <NavLink to="/login">Inicia Sesion</NavLink>
                            </span>
                            <span className="px-6 py-2 text-center text-white transition duration-300 ease-in-out bg-orange-500 rounded-xl hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <NavLink to="/register">Registrate</NavLink>
                            </span>
                        </div>
                    </div>
                    <figure className="w-1/2">
                    <img src={ImgTunota} className="rounded-xl" />

                    </figure>
                </section>

            </main>
        </Layout>
    )
}

export { WelcomePage };