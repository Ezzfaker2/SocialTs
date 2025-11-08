import {useForm} from "react-hook-form";


export const AllUsersSearch = (props: any) => {
    const {reset, handleSubmit, register} = useForm({

defaultValues: {
    friend: null,
    term: ""
}
    })

const onSubmit = (data) => {

    props.onFilterChange(data)
    console.log(data)
    reset()
}
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("term")}/>
            <select   {...register("friend")}>
                <option value="null" >all</option>
                <option value="true">friends</option>
                <option value="false">not friends</option>
            </select>
            <button>Find</button>
        </form>
    )


}