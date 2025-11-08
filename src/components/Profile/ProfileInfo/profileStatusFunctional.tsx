import {useEffect, useState} from "react";


export const ProfileStatusFunctional = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)


    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    const toggleEditModeFalse = () => {
        setEditMode(false);
        props.userUpdateStatusThunk(status);
    }

    const toggleEditModeTrue = () => {
        setEditMode(true)
    }

        return (
            <div>
                {
                    !editMode && <div><span onDoubleClick={toggleEditModeTrue}><div>{props.status}</div></span></div>
                }
                {
                    editMode && <div><input onChange={onStatusChange} value={props.status} autoFocus={true} onBlur={toggleEditModeFalse}/>
                    </div>
                }

            </div>
        )
    }
