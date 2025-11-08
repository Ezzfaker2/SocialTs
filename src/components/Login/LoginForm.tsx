import {Resolver, SubmitErrorHandler, useForm} from "react-hook-form";
import {schema} from "../../Validation/Validation.ts";
import { yupResolver } from '@hookform/resolvers/yup';
import {Navigate} from "react-router-dom"
import "./LoginForm.css"
import React from "react";



export type FormType = {
    email: string;
    password: string;
    checkbox: boolean ;

}


interface LoginFormProps {
    isAuth: boolean;
    captchaUrl?: string; // Опциональное свойство
    loginThunk: (email: string, password: string, checkbox: boolean) => void;
}

export const LoginForm:React.FC<LoginFormProps> = ({isAuth, captchaUrl,loginThunk}) => {
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


        <form onSubmit={handleSubmit(onSubmit,onSubmitError)}>
            {captchaUrl && <img src={captchaUrl} alt="/"/>}
            <div><input placeholder="Login" type="text" {...register("email")}/></div>
            <p className="error">{errors.email?.message}</p>
            <div><input placeholder="Password" type="text" {...register("password")
            }/>
                {captchaUrl && <img src={captchaUrl} alt=""/>}
                <p className="error">{errors.email?.message}</p>
            </div>
            <div><input type="checkbox" {...register("checkbox")}/> remember me</div>

            <div><button>Login</button></div>

        </form>
    )
}