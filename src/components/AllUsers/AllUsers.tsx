import styles from "./Allusers.module.css";

import React, { useEffect } from "react";
import {
    currentPageSelector,
    filterSelector,
    followingProgressSelector,
    getAllUsersSelector,
    pageSizeSelector,
    totalUsersCountSelector
} from "../Redux/AllUsersSelector.ts";
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, followThunk, getAllUsersThunk, unfollowThunk } from "../Redux/AllUsersReducer.ts";
import { AllUsersSearch } from "./AllUsersSearch.tsx";
import {useLocation, useNavigate, useSearchParams} from "react-router";
import {NavLink} from "react-router-dom";




export const AllUsers: React.FC = () => {
    const totalUsersCount = useSelector(totalUsersCountSelector);
    const pageSize = useSelector(pageSizeSelector);
    const currentPage = useSelector(currentPageSelector);
    const allUsers = useSelector(getAllUsersSelector);
    const followingProgress = useSelector(followingProgressSelector);
    const filter = useSelector(filterSelector);
    const dispatch = useDispatch<dispatchType>();

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Обновление URL при изменении фильтра или страницы
    useEffect(() => {
        const newSearchParams = new URLSearchParams();
        if (filter.term) newSearchParams.set('term', filter.term);
        if (filter.friend !== null) newSearchParams.set('friend', filter.friend.toString());
        newSearchParams.set('page', currentPage.toString());

        navigate({
            pathname: "/users",
            search: newSearchParams.toString(),
        }, { replace: true }); // replace: true для замены истории, а не добавления
    }, [filter, currentPage, navigate]);

    // Инициализация при монтировании (парсинг URL и загрузка данных)
    useEffect(() => {
        const term = searchParams.get('term') || '';
        const friend = searchParams.get('friend') === 'true' ? true : searchParams.get('friend') === 'false' ? false : null;
        const page = parseInt(searchParams.get('page') || '1', 10);

        const parsedFilter = { term, friend };
        dispatch(getAllUsersThunk({ pageNumber: page, pageSize, filter: parsedFilter }));
    }, [searchParams, dispatch, pageSize]); // Зависимости: searchParams для триггера при изменении URL

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