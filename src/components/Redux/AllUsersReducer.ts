import {allUsersType, EnumsType} from "../../Types/Types.ts";
import {Dispatch} from "redux";
import {baseThunkType, inferActionsTypes} from "./stateRedux.ts";
import {usersAPI} from "../Api/Api.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


type allActionType = inferActionsTypes<typeof allUsersReducer.actions>
type initialStateType = typeof initialState;
type dispatchType = Dispatch<allActionType>
type thunkType = baseThunkType<allActionType>


export const initialState = {
    allUsers: [] as Array<allUsersType>,
    pageSize: 5,
    totalUsersCount: 100,
    currentPage: 1,
    preloaderFetching: false,
    followingProgress: [] as Array<number>,
    filter: {
        term: "",
        friend: null as null | boolean,
    }
}

export const allUsersReducer = createSlice({
    name: "allUsers",
    initialState,
    reducers: {
        follow(state, action) {
            const userId = action.payload
            state.allUsers.map((i) => {
                if (i.id === userId) {
                    i.followed = true
                }
            })
        },
        unfollow(state, action) {
            state.allUsers.map(i => {
                if (i.id === action.payload) {
                    i.followed = false
                }
            })
        },
        setUser(state, action) {
            state.allUsers = action.payload
        },
        setFilter(state, action) {
            state.filter = action.payload
        },
        toggleDisableButton(state, action) {
            const {toggle, userId} = action.payload;
            if (toggle) {
                state.followingProgress.push(userId);
            } else {
                state.followingProgress = state.followingProgress.filter(id => id !== userId);
            }
        },
        preloaderFetching(state, action) {
            state.preloaderFetching = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        }
    }
})
export const {
    follow,
    unfollow,
    setCurrentPage,
    preloaderFetching,
    setFilter,
    setUser,
    toggleDisableButton
} = allUsersReducer.actions
export const UsersReducer = allUsersReducer.reducer





export const getAllUsersThunk = createAsyncThunk(
    "allUsers/getAllUsersThunk",
    async ({currentPage, pageSize, filter}: initialStateType, {dispatch, rejectWithValue}) => {
        try {
            dispatch(preloaderFetching(true))
            dispatch(setFilter(filter))
            let response = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
            dispatch(preloaderFetching(false))
            dispatch(setUser(response.items))
        } catch (e) {
            if ( typeof e === "string") {
              return  e
            } else {
                return rejectWithValue(e)
            }
        }
    }
)


export const followThunk = (userId: number): thunkType => {
    return async (dispatch: dispatchType) => {
        dispatch(toggleDisableButton({userId, toggle: true}))
        let data = await usersAPI.follow(userId)
        if (data.resultCode === EnumsType.followSuccess) {
            dispatch(follow(userId))
        }
        dispatch(toggleDisableButton({userId, toggle: false}))
    }
}
export const unfollowThunk = (userId: number): thunkType => {
    return async (dispatch: dispatchType) => {
        dispatch(toggleDisableButton({userId, toggle: true}))
        let data = await usersAPI.unfollow(userId)
        if (data.resultCode === EnumsType.followSuccess) {
            dispatch(unfollow(userId))
        }
        dispatch(toggleDisableButton({userId, toggle: false}))
    }
}
