import React, {useEffect, useState} from "react";
import {ChatMessages} from "./chatMessages.tsx";
import {ChatAddMessageForm} from "./ChatAddMessageForm.tsx";

export const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)


    useEffect(() => {
        function createChannel() {
            setWsChannel(new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"));

        }
        createChannel()
    }, [])

    useEffect(() => {
        wsChannel?.addEventListener('close', () => console.log("close"));
    }, [wsChannel]);

    return (
        <div>
            <ChatMessages wsChannel={wsChannel}/>
            <ChatAddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}