import type {ReactNode} from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import {TalismanPage} from "./page/TalismanPage";
import {render} from "./lib/react/Render";

function App(): ReactNode {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TalismanPage/>}/>
            </Routes>
        </BrowserRouter>
    </>;
}

render(<App/>);