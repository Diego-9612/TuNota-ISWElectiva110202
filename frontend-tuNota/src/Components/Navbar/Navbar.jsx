import { NavLink } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TbMessageFilled } from "react-icons/tb";
import { MdNotifications } from "react-icons/md";
import { LuSquareMenu } from "react-icons/lu";

function Navbar() {

    const activeStyle = 'underline underline-offset-4';

    return (
        <nav className="fixed top-0 z-10 flex items-center justify-between w-1/2 px-12 py-4 my-3 font-light border-2 rounded-full mx-96">
            <ul className="flex justify-center items center">
                <li className="text-xl font-bold">
                    <NavLink
                        to={'/'}
                    >TUNOTA</NavLink>
                </li>
            </ul>
            <ul className="flex items-center justify-center gap-5">
                <li className="text-base">
                    <NavLink
                        to={'/my-account'}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined}>user@gmail.com</NavLink>
                </li>
                <li>
                    <HiOutlineDotsVertical className="text-4xl" />
                </li>
                <li>
                    <TbMessageFilled className="text-2xl" />
                </li>
                <li>
                    <MdNotifications className="text-2xl" />
                </li>
                <li>
                    <LuSquareMenu className="text-3xl" />
                </li>
                <li>
                    <HiOutlineDotsVertical className="text-4xl" />
                </li>
            </ul>
        </nav>

    );

}

export { Navbar };