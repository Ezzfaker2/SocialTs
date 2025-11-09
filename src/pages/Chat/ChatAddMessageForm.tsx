import React, {useEffect, useState} from "react";

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