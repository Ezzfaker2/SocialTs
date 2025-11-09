import "./Dialog.css"
import {Users} from "./Users/Users.tsx";
import {Messages} from "./Messages/Messages.tsx";
import {DialogForm} from "./DialogForm.tsx";


import {useDispatch, useSelector} from "react-redux";
import {dialogPageSelector} from "../Redux/allUsersSelector/AllUsersSelector.ts";
import {postNewMessageBodyAC} from "../Redux/DialogReducer.ts";





 const Dialog = () => {

     const dialogPage = useSelector(dialogPageSelector)
    const dispatch = useDispatch()

   const sendMessage = (data:string) => {
        dispatch(postNewMessageBodyAC(data))
    }




    const finishUsersData = dialogPage.usersMessages.map((u: any) => <Users name={u.name} id={u.id} key={u.id}/>)
    const finishUsersMessages = dialogPage.usersMessages.map((m: any) => <Messages messages={m.messages} id={m.id} key={m.id}/>)

    return (
        <>
            <div className="dialogs">
                <div className="dialog">
                    {finishUsersData}
                </div>
                <div>
                    <div>{finishUsersMessages}</div>
                    <div>
                        <DialogForm sendMessage={sendMessage}/>
                    </div>
                </div>
            </div>

        </>
    )
}



export default Dialog;