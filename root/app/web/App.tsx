import * as WebLib from "->web.lib";
import * as WebPage from "->web.page";

function App(): WebLib.Component {
    return <>
        <WebLib.BrowserRouter>
            <WebLib.Routes>
                <WebLib.Route 
                    path="/" 
                    element={<WebPage.Home/>}/>
            </WebLib.Routes>
        </WebLib.BrowserRouter>
    </>;
}

WebLib.render(<App/>);