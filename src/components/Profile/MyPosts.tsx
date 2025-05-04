import {Post} from "./Post.tsx";


export const MyPosts = (props:any) => {

    const finnalyPosts = props.allPosts.map((p:any)=> <Post message={p.message} likes={p.likes}/>)

    return (
        <div>
            <div>My posts</div>
            <textarea></textarea>
            <button>Add post</button>
            {finnalyPosts}
        </div>
    )
}