import m from "./Sidebar.module.css"
import {NavLink} from "react-router-dom";



export const Sidebar = () => {
    return (
        <nav className={m.sidebar}>
            <div><NavLink to="/Profile" className={m.item}>Profile</NavLink></div>
            <div><NavLink to="/Dialog" className={m.item}>Message</NavLink></div>
            <div><NavLink to="/Dialog" className={m.item}>News</NavLink></div>
            <div><NavLink to="/Dialog" className={m.item}>Music</NavLink></div>
            <div><NavLink to="/Dialog" className={m.item}>Settings</NavLink></div>
            <div><NavLink to="/Users" className={m.item}>All Users</NavLink></div>
            <div><NavLink to="/Chatpage" className={m.item}>Chat Page</NavLink></div>
        </nav>
    )
}