import {inferActionsTypes} from "./stateRedux.ts";
import {createSlice} from "@reduxjs/toolkit";


export type DialogInitialStateType = typeof initialState
export type usersMessagesType = {
    messages: string,
    id: string,
}

type allActionsType = inferActionsTypes<typeof actions>
export const initialState = {
    usersMessages: [
        {messages: "Privet", id: "1"},
        {messages: "Ku", id: "2"},
        {messages: "Yo", id: "3"}
    ] as Array<usersMessagesType>,
}




export const dialogReducer = createSlice({
    name: "dialogReducer",
    initialState,
    reducers: {
        postNewMessageBodyAC(state, action) {
            state.usersMessages.push({ messages: action.payload.toString(), id: "900" });
        }
    }
})
export const {postNewMessageBodyAC} =dialogReducer.actions;
export const dialogReducerState = dialogReducer.reducer;
