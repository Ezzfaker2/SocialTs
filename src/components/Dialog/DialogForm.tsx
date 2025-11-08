import {useForm} from "react-hook-form";
import React from "react";






export type DialogFormPropsType = {
    sendMessage:  (messageText: string) => void;
}



export const DialogForm:React.FC<DialogFormPropsType> = ({sendMessage}) => {
    const {handleSubmit, register, reset} = useForm({
        defaultValues: {
            message: ""
        }
    });
    const onSubmit = (data:any) => {
        debugger
        sendMessage(data.message)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div><textarea placeholder="Message" {...register("message", {required: "this field is required"})}/>
            </div>
            <div>
                <button>
                    Send
                </button>
            </div>
        </form>
    )
}