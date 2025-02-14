import {
    type ReactNode
} from "react";
import { 
    type LinkProps as LinkProps$0,
    Link as Link$0
} from "react-router-dom";

export function Link({ to, style, children, ...more }: Link.Props): ReactNode {
    return <>
        <Link$0
            to={
                to
            }
            style={{
                all: "unset"
            }}
            { ...more }>
            { children }
        </Link$0>
    </>;
} 

export namespace Link {
    export type Props =
        & LinkProps$0
}
