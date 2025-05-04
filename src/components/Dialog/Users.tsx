import {NavLink} from "react-router";

export type UserPropsType = {
    name: string,
    id: string,
}
export const Users = (props: UserPropsType) => {
    const path = "/Dialog/" + props.id
    return (
        <div><NavLink to={path} className="dialog_item">{props.name}</NavLink></div>
    )
}