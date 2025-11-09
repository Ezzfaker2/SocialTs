import styles from "./Allusers.module.css";
import * as selectors from "../Redux/allUsersSelector/index.ts"
import React, {useEffect} from "react";
import {followThunk, getAllUsersThunk, unfollowThunk} from "../Redux/AllUsersReducer.ts";
import {AllUsersSearch} from "./AllUsersSearch.tsx";
import {NavLink, useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../Redux/stateRedux.ts";


export const AllUsers: React.FC = () => {

    const [searchParams] = useSearchParams();

    const totalUsersCount = useAppSelector(selectors.totalUsersCountSelector);
    const pageSize = useAppSelector(selectors.pageSizeSelector);
    const currentPage = useAppSelector(selectors.currentPageSelector);
    const allUsers = useAppSelector(selectors.getAllUsersSelector);
    const followingProgress = useAppSelector(selectors.followingProgressSelector);
    const filter = useAppSelector(selectors.filterSelector);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();




    useEffect(() => {
        const newSearchParams = new URLSearchParams();
        if (filter.term) newSearchParams.set('term', filter.term);
        if (filter.friend !== null) newSearchParams.set('friend', filter.friend.toString());
        newSearchParams.set('page', currentPage.toString());

        navigate({
            pathname: "/users",
            search: newSearchParams.toString(),
        }, { replace: true });
    }, [filter, currentPage, navigate]);


    useEffect(() => {
        const term = searchParams.get('term') || '';
        const friend = searchParams.get('friend') === 'true' ? true : searchParams.get('friend') === 'false' ? false : null;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const parsedFilter = { term, friend };
        dispatch(getAllUsersThunk({ pageNumber: page, pageSize, filter: parsedFilter }));
    }, [searchParams, dispatch, pageSize]);

    const onPageChange = (pageNumber: number) => {
        dispatch(getAllUsersThunk({ pageNumber, pageSize, filter }));
    };

    const onFilterChange = (filter: any) => {
        dispatch(getAllUsersThunk({ pageNumber: 1, pageSize, filter }));
    };

    const follow = (userId: number) => {
        dispatch(followThunk(userId));
    };

    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId));
    };

    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <AllUsersSearch onFilterChange={onFilterChange} />
            <div>
                {pages.map(p => (
                    <span
                        key={p}
                        className={currentPage === p ? styles.selectedPage : ""}
                        onClick={() => onPageChange(p)}
                        style={{ cursor: 'pointer', margin: '0 5px' }}
                    >
                        {p}
                    </span>
                ))}
            </div>

            {allUsers.length > 0 ? (
                allUsers.map(u => (
                    <div key={u.id}>
                        <span>
                            <div>
                                <NavLink to={"/Profile/" + u.id}>
                                    <img
                                        src={u.photos.small != null ? u.photos.small : "https://pikuco.ru/upload/test_stable/c42/c4238640f6ea4233a1b5085f9ef70218.webp"}
                                        alt=""
                                    />
                                </NavLink>
                            </div>
                            <div>
                                {u.followed ? (
                                    <button disabled={followingProgress.some(id => id === u.id)} onClick={() => {
                                        unfollow(u.id);
                                    }}>unfollow</button>
                                ) : (
                                    <button disabled={followingProgress.some(id => id === u.id)} onClick={() => {
                                        follow(u.id);
                                    }}>follow</button>
                                )}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div><span>Привет</span></div>
                            </span>
                            <span>
                                <div></div>
                            </span>
                        </span>
                    </div>
                ))
            ) : (
                <div>No users found</div>
            )}
        </div>
    );
};