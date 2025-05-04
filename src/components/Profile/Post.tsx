import "./Post.css"
export type TypeProps = {
message: string;
likes: string;
}






export const Post = (props: TypeProps) => {
    return (
        <div className="post">
            <img
                src="https://www.sonypictures.com/sites/default/files/styles/max_1012x780/public/2024-12/paddingtoninperu_large_whatsnew_1012x780-recovered.jpg?itok=Z6CvR6ay"
                alt="/"/>
            {props.message}
            <div>
                <span>Like</span> {props.likes}
            </div>
        </div>
    )
}