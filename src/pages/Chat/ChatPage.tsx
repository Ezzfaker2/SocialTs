import React from "react";
import {Chat} from "./Chat.tsx";


export type ChatMessageType = {
    message: string;
    photo: string;
    userId: string;
    userName: string;
}

const ChatPage: React.FC = () => {

    return (
        <div>
            <Chat/>
        </div>
    )
}




export default ChatPage