import {NavLink} from "react-router";

export default function NavigationBar() {
    return (

        <nav>
            <NavLink to={"/"}>Overview</NavLink>
            <NavLink to={"/todo"}>Todos</NavLink>
            <NavLink to={"/doing"}>Doing</NavLink>
            <NavLink to={"/done"}>Done</NavLink>
        </nav>
    )
}