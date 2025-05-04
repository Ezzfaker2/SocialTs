import "./Dialog.css"
import {Users} from "./Users.tsx";
import {Messages} from "./Messages.tsx";



export const Dialog = (props:any) => {



    const finishUsersData = props.usersData.map((u:any)=> <Users name={u.name} id={u.id}/>)
    const finishUsersMessages = props.usersMessages.map((m:any)=> <Messages messages={m.messages} id={m.id}/>)


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