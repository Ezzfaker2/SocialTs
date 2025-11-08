import {authThunk} from "./authReducer.ts";
import {inferActionsTypes} from "./stateRedux.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


type actionsType = inferActionsTypes<typeof actions>
export type initialStateType = typeof initialState


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
    async (_, thunkAPI) => {
        try {
            let dispatchResoult = thunkAPI.dispatch(authThunk())
            await Promise.all([dispatchResoult])
            thunkAPI.dispatch(initializedAuthData())
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)