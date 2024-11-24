import * as WebLib from "->web.lib";
import * as WebComponents from "->web.components";

export function Home(): WebLib.Component {
    return <>
        <WebComponents.ResponsiveAnchorPage>
            <WebComponents.Nav/>
            <>HELLO_WORLD</>
        </WebComponents.ResponsiveAnchorPage>
    </>;
}