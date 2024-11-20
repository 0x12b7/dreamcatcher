import type {ReactNode} from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import {DaoPage} from "./page/DaoPage";
import {RetroMinimaPriceChart} from "./component/module/retro-minima_/chart/RetroMinimaPriceChart";
import {render} from "./lib/react/Render";

function App(): ReactNode {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DaoPage/>}/>
            </Routes>
        </BrowserRouter>
    </>;
}

render(<App/>);