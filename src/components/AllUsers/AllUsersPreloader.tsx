import {useSelector} from "react-redux";
import {Preloader} from "../../Preloader/Preloader.tsx";
import {preloaderFetchingSelector} from "../Redux/allUsersSelector/AllUsersSelector.ts";
import {AllUsers} from "./AllUsers.tsx";


export const AllUsersPreloader = () => {


const preloaderFetching = useSelector(preloaderFetchingSelector);




    return (
        <>
            {preloaderFetching ? <Preloader/> : null}
            <AllUsers/>
        </>
    )
}


