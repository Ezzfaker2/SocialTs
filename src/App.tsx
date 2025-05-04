import "./App.css"
import {Header} from "./components/Header/Header.tsx";
import {Sidebar} from "./components/Sidebar/Sidebar.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import {Dialog} from "./components/Dialog/Dialog.tsx";
import {Profile} from "./components/Profile/Profile.tsx";


function App() {


    return (


        <BrowserRouter>
            <div className="wrapper">
                <Header></Header>
                <Sidebar></Sidebar>
                <Routes>
                    <Route path="/Dialog" Component={Dialog}></Route>
                    <Route path="/Profile" Component={Profile}></Route>
                </Routes>
            </div>
        </BrowserRouter>

    )
}
export default App
