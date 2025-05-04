import {MyPosts} from "./MyPosts.tsx";
import {ProfileInfo} from "./ProfileInfo.tsx";



export const Profile = (props:any) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts allPosts={props.allPosts}/>
        </div>

)
}