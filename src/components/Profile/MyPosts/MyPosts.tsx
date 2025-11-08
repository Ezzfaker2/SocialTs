import {Post} from "../Posts/Post.tsx";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addPostSelector} from "../../Redux/AllUsersSelector.ts";
import {profileReducer} from "../../Redux/ProfileReducer.ts";


export const MyPosts = () => {

    const allPosts = useSelector(addPostSelector)
    const dispatch = useDispatch()


    const addPost = (data) => {
        dispatch(profileReducer.actions.addPost(data))
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


