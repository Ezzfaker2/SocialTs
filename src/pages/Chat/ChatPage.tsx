import React, {useEffect, useState} from "react";


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

export const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {


    return <div>
        <img src={message.photo}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>


}


export const ChatAddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    useEffect(() => {
        wsChannel?.addEventListener('open', () => setReadyStatus("ready"));
    }, []);
    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel?.send(message)
        setMessage('')
    }
    return (
        <div>
            <div><textarea name="" id="" value={message} onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
            </div>
            <div>
                <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}


export default ChatPage