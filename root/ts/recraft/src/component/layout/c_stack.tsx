import type { ReactNode } from "react";
import { C } from "@main";

export function CStack(props: CStack.Props): ReactNode {
    let { style, children, ...more } = props;
    
    return <>
        <C
            style={{
                justifyContent: "start",
                ...style
            }}
            { ...more }>
            { children }
        </C>
    </>;
}

export namespace CStack {
    export type Props =
        & C.Props;
}