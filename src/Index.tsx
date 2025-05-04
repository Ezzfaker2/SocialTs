import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'


export type TypeUsersData = {
    name:string
    id: string
}
export type TypeUsersMessages = {
    messages: string
    id: string
}
export type TypeAllPosts = {
    message: string
    likes: string
}
export type propsType = {
    usersData : TypeUsersData[]
    usersMessages: TypeUsersMessages[]
    allPosts: TypeAllPosts[]
}


const usersData:Array<TypeUsersData> = [
    {name: "Dima", id: "1"},
    {name: "Roma", id: "2"},
    {name: "Danya", id: "3"}
]

const usersMessages:Array<TypeUsersMessages> = [
    {messages: "Privet", id: "1"},
    {messages: "Ku", id: "2"},
    {messages: "Yo", id: "3"}
]

const allPosts:Array<TypeAllPosts> = [
    {message: "hi, sup", likes: "12"},
    {message: "hi, sup", likes: "13"},
    {message: "hi, sup", likes: "14"},
    {message: "hi, sup", likes: "15"}
]

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App usersData={usersData} usersMessages={usersMessages} allPosts={allPosts}/>
    </StrictMode>,
)



