import {
    profileAPI, usersAPI,
} from "../Api/Api.ts";
import {allPostsType,  profileType} from "../../Types/Types.ts";
import {baseThunkType, inferActionsTypes} from "./stateRedux.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";




export type allActionTypes = inferActionsTypes<typeof actions>
export type AllThunkActionTypes = baseThunkType<allActionTypes>
export type initialStateType = typeof initialState




export const initialState = {
    allPosts: [
        {id: 1, message: "hi, sup", likes: "12"},
        {id: 2, message: "hi, sup", likes: "13"},
        {id: 3, message: "hi, sup", likes: "14"},
        {id: 4, message: "hi, sup", likes: "15"}
    ] as Array<allPostsType>,
    profile: null as profileType | null,
    status: null as string | null,
}




export const profileReducer = createSlice({
    name: "profileReducer",
    initialState,
    reducers: {
        successPhoto(state, action) {
            state.profile = action.payload;
        },
        setUserStatus(state, action) {
            state.status = action.payload;
        },
        setUserProfile(state, action) {
            state.profile = action.payload;
        },
        addPost(state, action) {
            const newItem = {
                id: 7,
                message: action.payload,
                likes: "1000",
            };
            state.allPosts.push(newItem);
        }
    }
})

export const {successPhoto,
    setUserStatus,
    setUserProfile,
    addPost} = profileReducer.actions;
export const profileReducerSelector = profileReducer.reducer








export const userProfileThunk = createAsyncThunk(
    "profileReducer/userProfileThunk",
    async (userId, thunkAPI) => {
        try {
          const response = await usersAPI.userProfile(userId)
            thunkAPI.dispatch(setUserProfile(response))

        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)

        }

    })


export const userStatusThunk = createAsyncThunk(
    "profileReducer/userStatusThunk",
    async (userId, thunkAPI) => {
        try {
            const response = await usersAPI.userStatus(userId)
            thunkAPI.dispatch(setUserStatus(response.data))
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const userUpdateStatusThunk = createAsyncThunk(
    "profileReducer/userUpdateStatusThunk",
    async (status, thunkAPI) => {
        try {
          const response = await usersAPI.userUpdateStatus(status)
              thunkAPI.dispatch(setUserStatus(status))
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    })

export const savePhoto = createAsyncThunk(
    "profileReducer/savePhoto",
    async (file, thunkAPI) => {
        try {
            const response = await profileAPI.SavePhoto(file)
            thunkAPI.dispatch(successPhoto(file))
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    })
export const profileNew = createAsyncThunk(
    "profileReducer/profileNew",
    async (profile, thunkAPI) => {
        try {
           const response = await profileAPI.updateProfileInfo(profile)

        } catch (e) {
            thunkAPI.rejectWithValue(e.message)
        }
    }
    )