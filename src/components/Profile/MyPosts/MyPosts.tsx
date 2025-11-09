import {Post} from "../Posts/Post.tsx";
import {useForm} from "react-hook-form";
import {addPostSelector} from "../../Redux/allUsersSelector/AllUsersSelector.ts";
import {profileReducer} from "../../Redux/ProfileReducer.ts";
import {useAppDispatch, useAppSelector} from "../../Redux/stateRedux.ts";


export const MyPosts = () => {
    const allPosts = useAppSelector(addPostSelector)
    const dispatch = useAppDispatch()





    const addPost = (data) => {
        return dispatch(profileReducer.actions.addPost(data))
    }




    const postElement = allPosts.map((p: any) => <Post message={p.message} likes={p.likes} key={p.id}/>)

    const {register, handleSubmit, reset} = useForm();

    const onSubmit = (data) => {
            addPost(data.message)
            reset()
        }
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>My posts</div>
                    <textarea placeholder="enter message" {...register("message", {required: true})}/>
                    <button> Add post</button>
                    {postElement}
                </div>
            </form>
        )
    }


