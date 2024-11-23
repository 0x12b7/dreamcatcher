import * as WebLib from "->web.lib";

function App(): WebLib.Component {
    return <>
        <WebLib.BrowserRouter>
            <WebLib.Routes>
                <WebLib.Route 
                    path="/" 
                    element={<></>}/>
            </WebLib.Routes>
        </WebLib.BrowserRouter>
    </>;
}

WebLib.render(<App/>);