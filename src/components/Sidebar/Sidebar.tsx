import style from "./Sidebar.module.css"
import {NavLink} from "react-router-dom";



export const Sidebar = () => {
    return (
        <nav className={style.sidebar}>
            <NavLink to="/Profile" className={style.item}>Profile</NavLink>
            <NavLink to="/Dialog" className={style.item}>Message</NavLink>
            <NavLink to="/Dialog" className={style.item}>News</NavLink>
            <NavLink to="/Dialog" className={style.item}>Music</NavLink>
            <NavLink to="/Dialog" className={style.item}>Settings</NavLink>
            <NavLink to="/Users" className={style.item}>All Users</NavLink>
            <NavLink to="/Chatpage" className={style.item}>Chat Page</NavLink>
        </nav>
    )
}
