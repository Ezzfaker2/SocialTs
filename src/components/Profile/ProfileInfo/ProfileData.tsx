import {Contact} from "./ProfileInfo.tsx";

export const ProfileData = (props) => {
    return (
        <div>
            <div><b
                onDoubleClick={props.toggleEditMode}>lookingForAJob</b>: {props.profile.lookingForAJob ? "yes" : "no"}
            </div>
            <div><b>My professional skills</b>: {props.profile.lookingForAJobDescription}
            </div>
            <div><b>About me</b>: {props.profile.aboutMe}
            </div>
            <div><b>Contacts</b>: {Object.keys(props.profile.contacts).map(keys => {
                    return <Contact key={keys} contactTitle={keys} contactValue={props.profile.contacts[keys]}/>
                }
            )
            }

            </div>
        </div>
    )
}