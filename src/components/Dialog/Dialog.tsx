import "./Dialog.css"
import {Users} from "./Users.tsx";
import {Messages} from "./Messages.tsx";


export const Dialog = () => {

    const UsersDate = [
        {name: "Dima", id: "1"},
        {name: "Roma", id:"2"},
        {name: "Danya", id:"3"}
    ]

    const UsersMessages = [
        {messages: "Priv", id: "1"},
        {messages: "Ku", id:"2"},
        {messages: "Yo", id:"3"}
    ]

    const finishUsersData = UsersDate.map((u)=> <Users name={u.name} id={u.id}/>)
    const finishUsersMessages = UsersMessages.map((m)=> <Messages messages={m.messages} id={m.id}/>)


    return (
        <div className="dialogs">
            <div className="dialog">
                {finishUsersData}
            </div>
            <div>
                {finishUsersMessages}
            </div>
        </div>


    )

}