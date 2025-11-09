import {SubmitErrorHandler, useForm} from "react-hook-form";
import {schema} from "../../Validation/Validation.ts";
import {yupResolver} from '@hookform/resolvers/yup';
import {Navigate} from "react-router-dom"
import style from "./LoginForm.module.css"

import {useAppSelector} from "../Redux/stateRedux.ts";
import {loginThunk} from "../Redux/authReducer.ts";


export type FormType = {
    email: string;
    password: string;
    checkbox: boolean ;

}


export const LoginForm = () => {


    const {isAuth,captchaUrl} = useAppSelector(state => state.auth);





    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormType>({
        defaultValues: {
            email: '',
            password: '',
            checkbox: false,
        }, resolver: yupResolver(schema)
    })


    const onSubmit = (data:FormType) => {
        loginThunk(data);
        reset()

    }
        const onSubmitError:SubmitErrorHandler<FormType> = (data:any) => {
        console.log(data);

    }
    


if(isAuth){
    return <Navigate to='/Profile' replace/>
}
    return (


        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
                {captchaUrl && <img src={captchaUrl} alt="/"/>}
                <div><input placeholder="Login" type="text" {...register("email")}/></div>
                <p className={style.error}>{errors.email?.message}</p>
                <div><input placeholder="Password" type="text" {...register("password")
                }/>
                    {captchaUrl && <img src={captchaUrl} alt=""/>}
                    <p className="error">{errors.email?.message}</p>
                </div>
                <div><input type="checkbox" {...register("checkbox")}/> remember me</div>

                <div>
                    <button>Login</button>
                </div>

            </form>
        </>
    )
}