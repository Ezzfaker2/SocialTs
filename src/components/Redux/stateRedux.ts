import {profileReducerSelector} from "./ProfileReducer.ts";
import { dialogReducerState} from "./DialogReducer.ts";
import {Action, combineReducers} from "redux";
import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import {UsersReducer} from "./AllUsersReducer.ts";
import {authReducer} from "./authReducer.ts";
import {AppReducerState} from "./AppReducer.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const rootReducer = combineReducers({
    profilePage: profileReducerSelector,
    dialogPage: dialogReducerState,
    allUsersPage: UsersReducer,
    auth: authReducer,
    app: AppReducerState,



})
export const store = configureStore({
    reducer: rootReducer
});

// @ts-ignore
window.store = store;
type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>; // ts по умному возвращает типы для редусеров
export type storeType = ReturnType<typeof store>
export type AppDispatch = storeType['dispatch'];


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;


export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type inferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;


