import {authThunk} from "./authReducer.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


export const initialState = {
    initialized: false as boolean,
}

export const AppReducer = createSlice({
    name: "AppReducer",
    initialState,
    reducers: {
        initializedAuthData(state) {
            state.initialized = true
        }
    }
})

export const {initializedAuthData} = AppReducer.actions
export const AppReducerState = AppReducer.reducer



export const InitializeThunk = createAsyncThunk(
    "AppReducer/InitializeThunk",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            let dispatchResalt = dispatch(authThunk())
            await Promise.all([dispatchResalt])
            dispatch(initializedAuthData())
        } catch (e) {
            if (typeof e === "string") {
                return e
            } else if ( e instanceof(Error)) {
                return rejectWithValue(e)
            }
            return rejectWithValue("Unknown error")



        }
    }
)