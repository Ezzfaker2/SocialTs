import m from "./Header.module.css"
import {NavLink} from "react-router-dom";
import logo from "../../../public/assets/typescript.svg"
import {isAuthSelector, loginSelector} from "../Redux/allUsersSelector/AllUsersSelector.ts";
import {useDispatch, useSelector} from "react-redux";
import {logoutThunk} from "../Redux/authReducer.ts";


export const Header = () => {


     const logOut = () => {
         dispatch(logoutThunk())
    }

    const isAuth = useSelector(isAuthSelector)
    const login = useSelector(loginSelector)
    const dispatch = useDispatch()






    return (
        <header className={m.header}>
            <img
                src={logo }
                alt={"/"}/>
            {isAuth ? login :
            <NavLink to="/Login" style={{float:"left"}}>Login</NavLink>}
            {!isAuth ?"": <button onClick={logOut}>Logout</button> }
        </header>
    )
}