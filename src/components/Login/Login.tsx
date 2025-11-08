import {LoginForm} from "./LoginForm.tsx";
import {connect} from "react-redux";
import {loginThunk} from "../Redux/authReducer.ts";

export type propsType = {
    loginThunk: Function
    isAuth: boolean,
    captchaUrl: string,
}
export const Login = ({loginThunk, isAuth, captchaUrl}: propsType) => {

    return <div>
        <h1>Login</h1>
        <LoginForm loginThunk={loginThunk} isAuth={isAuth} captchaUrl={captchaUrl}/>
    </div>
}
const mapStateToProps = (state: any) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export const LoginContainer = connect(mapStateToProps, {loginThunk})(Login)