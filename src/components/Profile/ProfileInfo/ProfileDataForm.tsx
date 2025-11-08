import {Contact} from "./ProfileInfo.tsx";
import {useForm} from "react-hook-form";



export const ProfileDataForm = ({profileNew, toggleEditMode, profile}) => {

    const {register, handleSubmit} = useForm()


    const onSubmit = (data: any) => {
        profileNew(data)
    }

    return (
        <form onDoubleClick={toggleEditMode} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <button>save</button>
            </div>
            <b>Full name</b>:
            <div><input type="text" {...register("fullName")}/></div>
            <div>
                <b>lookingForAJob</b>
                <input type="checkbox" {...register("lookingForAJob")}></input> {profile.lookingForAJob}
            </div>
            <div>
                <b>My professional skills</b>
                <input {...register("lookingForAJobDescription")}></input>: {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>About me</b>
                <input{...register("aboutMe")}></input>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>
                <input></input>: {Object.keys(profile.contacts).map(keys => {
                    return <Contact {...register("socials")} key={keys} contactTitle={keys} contactValue={profile.contacts[keys]}/>
                }
            )
            }
            </div>
        </form>
    )
}


