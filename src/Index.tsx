import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import "./index.css"
import {Provider} from "react-redux";
import {store} from "./components/Redux/stateRedux.ts";
import {BrowserRouter} from "react-router";
import {ComposeApp} from "./app/App.tsx";

const container = document.getElementById('root')!;
const root = createRoot(container);





export const rerenderEntireTree = (store) => {
    root.render(
        <BrowserRouter>
            <StrictMode>
                <Provider store={store}>
                    <ComposeApp/>
                </Provider>
            </StrictMode>
        </BrowserRouter>
    );
};
rerenderEntireTree(store)

