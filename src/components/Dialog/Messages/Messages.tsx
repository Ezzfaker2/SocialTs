export type MessagesPropsType = {
    messages: string,
    id: string,
}
export const Messages = (props: MessagesPropsType) => {
    return (
        <div className="messanges">
            <div>{props.messages}</div>
        </div>
    )
}