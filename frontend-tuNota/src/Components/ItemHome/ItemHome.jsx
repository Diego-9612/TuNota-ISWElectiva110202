import { NavLink } from "react-router-dom";
function ItemHome({ to, name }) {
    return (
        <li className="p-3 text-center rounded-xl bg-[#f3ead9] font-normal text-orange-500 hover:bg-orange-500 hover:text-white duration-100">
            <NavLink to={to}>
                {name}
            </NavLink>
        </li>
    );

}

export { ItemHome }