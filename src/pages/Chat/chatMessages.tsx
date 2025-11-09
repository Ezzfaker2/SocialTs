import React, {useEffect, useState} from "react";
import {ChatMessageType} from "./ChatPage.tsx";
import {Message} from "./Message.tsx";

export const ChatMessages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    useEffect(() => {

        wsChannel?.addEventListener("message", (e) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, newMessages]);
        })
    }, [wsChannel]);

    return (<div style={{height: "600px", overflowY: "auto"}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    )
}