import "./App.css"
import {Header} from "./components/Header/Header.tsx";
import {Sidebar} from "./components/Sidebar/Sidebar.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {Dialog} from "./components/Dialog/Dialog.tsx";
import {Profile} from "./components/Profile/Profile.tsx";
import {propsType} from "./Index.tsx";



function App(props:propsType) {

    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header></Header>
                <Sidebar></Sidebar>
                <Routes>
                    <Route path="/Dialog"
                           element={<Dialog usersMessages={props.usersMessages} usersData={props.usersData}/>}/>
                    <Route path="/Profile" element={<Profile allPosts={props.allPosts}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
