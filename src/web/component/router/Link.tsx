import type {ReactNode} from "react";
import type {LinkProps} from "react-router-dom";
import {Link as ReactRouterDomLink} from "react-router-dom";

export function Link({
    style,
    children,
    ... more}: LinkProps): ReactNode {
    return <>
        <ReactRouterDomLink
            style={{
                all: "unset",
                ... style
            }}
            {... more}>
            {children}
        </ReactRouterDomLink>
    </>;
}