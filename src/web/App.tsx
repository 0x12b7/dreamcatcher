import type {ReactNode} from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import {render} from "./util/meta/Render";

function App(): ReactNode {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element/>
            </Routes>
        </BrowserRouter>
    </>;
}

render(<App/>);