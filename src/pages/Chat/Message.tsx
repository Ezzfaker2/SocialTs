import React from "react";
import {ChatMessageType} from "./ChatPage.tsx";

export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {


    return <div>
        <img src={message.photo} alt="/"/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>


}