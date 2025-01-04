import type { ReactNode } from "react";
import type { RProps } from "@root";
import { R } from "@root";

export type RStackProps =
    & RProps
    & {};

export function RStack(props: RStackProps): ReactNode {
    let { style, children, ... more } = props;
    
    return <>
        <R
            style={{
                justifyContent: "start",
                ... style
            }}
            { ... more }>
            { children }
        </R>
    </>;
}