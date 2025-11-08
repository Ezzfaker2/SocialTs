import {ProfileInfo} from "./ProfileInfo/ProfileInfo.tsx";
import {MyPosts} from "./MyPosts/MyPosts.tsx";
import {useAppSelector} from "../Redux/stateRedux.ts";


export const Profile = ({owner,profile,status,userUpdateStatusThunk,savePhoto,profileNew}) => {
    return (
        <div>
            <ProfileInfo owner={owner} profile={profile}  status={status} userUpdateStatusThunk={userUpdateStatusThunk} savePhoto={savePhoto} profileNew={profileNew}/>
            <MyPosts/>
        </div>
    )
}