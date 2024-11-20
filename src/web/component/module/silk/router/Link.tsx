import {Link as ReactRouterDomLink} from "react-router-dom";
import * as Silk from "@silk";

export function Link(props: Silk.LinkProps): Silk.Component {
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