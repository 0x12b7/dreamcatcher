import {Link as ReactRouterDomLink} from "react-router-dom";
import * as WebLib from "->web.lib";

export function Link(props: WebLib.LinkProps): WebLib.Component {
    let {style, children, ... more} = props;
    
    return <>
        <ReactRouterDomLink
            style={{
                all: "unset",
                display: "contents",
                ... style
            }}
            {... more}>
            {children}
        </ReactRouterDomLink>
    </>;
}