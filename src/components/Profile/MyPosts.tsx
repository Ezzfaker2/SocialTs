import {Post} from "./Post.tsx";

export const MyPosts = () => {
    const AllPosts = [
        { message: "hi, sup", likes: "12"},
        { message: "hi, sup", likes: "13"},
        { message: "hi, sup", likes: "14"},
        { message: "hi, sup", likes: "15"}
        ]
    const finnalyPosts = AllPosts.map((p)=> <Post message={p.message} likes={p.likes}/>)
    ;
    return (
        <div>
            <div>My posts</div>
            <textarea></textarea>
            <button>Add post</button>
            {finnalyPosts}
        </div>
    )
}