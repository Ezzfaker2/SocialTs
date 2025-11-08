import {AppStateType} from "./stateRedux.ts";
export const getAllUsersSelector = (state:AppStateType) => {
    return state.allUsersPage.allUsers
}
export const pageSizeSelector = (state:AppStateType) => {
    return state.allUsersPage.pageSize
}
export const totalUsersCountSelector = (state:AppStateType) => {
    return state.allUsersPage.totalUsersCount
}
export const currentPageSelector = (state:AppStateType) => {
    return state.allUsersPage.currentPage
}
export const preloaderFetchingSelector = (state:AppStateType) => {
    return state.allUsersPage.preloaderFetching
}
export const followingProgressSelector = (state:AppStateType) => {
    return state.allUsersPage.followingProgress
}
export const filterSelector = (state:AppStateType) => {
    return state.allUsersPage.filter
}
export const dialogPageSelector = (state:AppStateType) => {
    return state.dialogPage
}
export const isAuthSelector = (state:AppStateType) => {
    return state.auth.isAuth
}
export const loginSelector = (state:AppStateType) => {
    return state.auth.login
}
export const addPostSelector = (state:AppStateType) => {
    return state.profilePage.allPosts
}


