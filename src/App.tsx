import "./App.css"
import {Sidebar} from "./components/Sidebar/Sidebar.tsx";

import {LoginContainer} from "./components/Login/Login.tsx";
import React, {Suspense, useEffect} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {InitializeThunk} from "./components/Redux/AppReducer.ts";
import {Preloader} from "./Preloader/Preloader.tsx";
import {AllUsersPreloader} from "./components/AllUsers/AllUsersPreloader.tsx";
import Dialog from "./components/Dialog/Dialog.tsx";
import {Header} from "./components/Header/Header.tsx";
import {Route, Routes} from "react-router";


const ProfileContainerCompose = React.lazy(() => import ( "./components/Profile/ProfileContainer.tsx"));
const ChatPageContainerCompose = React.lazy(() => import ( "./pages/Chat/ChatPage.tsx"));





type mapPropsType = ReturnType<typeof mapStateToProps>;
type mapDispatchType = {
    InitializeThunk: () => void
}


export const App:React.FC<mapPropsType & mapDispatchType> = ({InitializeThunk, initialized}) =>  {

    useEffect(() => {
        InitializeThunk()
    }, []);

        if (!initialized) {
            return <Preloader/>
        }
        return (
            <div className="wrapper">
                <Header/>
                <Sidebar/>
                <Routes> {/*рендерит первый попавшийся эелемен*/}

                    <Route path="/Dialog" element={
                        <Suspense fallback={<div>...loading</div>}>
                            <Dialog/>
                        </Suspense>
                    }/>

                    <Route path="/Profile/:userId?" element={
                        <Suspense fallback={<div>...loading</div>}>
                            <ProfileContainerCompose/>
                        </Suspense>
                    }/>
                    <Route path="/Users" element={<AllUsersPreloader/>}
                    />
                    <Route path="/Login" element={<LoginContainer/>}
                    />
                    <Route path="/Chatpage" element={<ChatPageContainerCompose/>}
                    />
                    <Route path="*" element={ <div style={{textAlign: 'center', marginTop: '50px'}}>
                        <h1>404 - Страница не найдена</h1>
                        <p>Извините, но страница, которую вы ищете, не существует.</p>
                    </div>}/>
                </Routes>
            </div>
        )
    }


const mapStateToProps = (state: any) => ({
    initialized: state.app.initialized
})
export const ComposeApp = compose<React.ComponentType>( connect(mapStateToProps, {InitializeThunk}))(App)
