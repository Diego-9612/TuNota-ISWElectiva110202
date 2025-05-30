import { NavLink } from "react-router-dom";
import ImgTunota from "../../assets/img/tunota.png";

function NavbarWelcome() {
    const activeStyle = 'underline underline-offset-4';

    return (
        <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between w-1/2 py-2 mx-auto mt-3">
            <ul className="flex items-center justify-center w-1/4">
                <li className="text-xl font-bold text-orange-500">
                    <figure className="m-0">
                        <img
                            src={ImgTunota}
                            alt="Logo"
                            className="w-auto h-16"
                        />
                    </figure>
                </li>
            </ul>
            <ul className="flex items-center justify-between w-3/4 px-12 text-base font-medium text-orange-500">
                <li className="">
                    <NavLink
                        to="/my-account"
                        className={({ isActive }) => (isActive ? activeStyle : '')}
                    >
                        Inicio
                    </NavLink>
                </li>
                <li className="">
                    <NavLink
                        to="/nosotros"
                        className={({ isActive }) => (isActive ? activeStyle : '')}
                    >
                        Nosotros
                    </NavLink>
                </li>
                <li className="">
                    <NavLink
                        to="/ayuda"
                        className={({ isActive }) => (isActive ? activeStyle : '')}
                    >
                        Ayuda
                    </NavLink>
                </li>
                <li className="px-6 py-2 text-center text-white transition duration-300 ease-in-out bg-orange-500 rounded-xl hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <NavLink
                        to="/login"
                    >
                        Ingresar
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export { NavbarWelcome };

