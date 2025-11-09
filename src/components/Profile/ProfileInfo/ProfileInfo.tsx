import m from "../Profile.module.css"
import photo from "../../../../public/assets/1-intro-photo-final.jpg"
import {ProfileStatusFunctional} from "./profileStatusFunctional.tsx";
import {Preloader} from "../../../Preloader/Preloader.tsx";
import {useState} from "react";
import {ProfileDataForm} from "./ProfileDataForm.tsx";
import {ProfileData} from "./ProfileData.tsx";



export const ProfileInfo = (props: any) => {

    const [editMode, setEditMode] = useState(false);


    const toggleEditMode = () => {
        setEditMode(true)
    }
    const toggleEditModeOff = () => {
        setEditMode(false)
    }

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    return <div className={m.main}>
        <div className={m.item}>
            <img src={props.profile.photos.large || photo}
                 alt=""/>
            ava+disc
        </div>
        {props.owner && <input type={"file"}
                               onChange={onMainPhotoSelected}/>}
        <ProfileStatusFunctional profile={props.profile}
                                 status={props.status}
                                 userUpdateStatusThunk={props.userUpdateStatusThunk}/>
        {editMode ? <ProfileDataForm profile={props.profile}
                                     owner={props.owner}
                                     toggleEditModeOff={toggleEditModeOff} profileNew={props.profileNew}/>
            :
            <ProfileData profile={props.profile}
                         owner={props.owner}
                         toggleEditMode={toggleEditMode}/>
        }

    </div>
}


export const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>: {contactValue}
    </div>
}

