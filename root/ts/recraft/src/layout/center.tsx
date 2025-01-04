import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

export type CenterProps =
    & ComponentPropsWithRef<"div">
    & {};

export function Center(props: CenterProps): ReactNode {
    let { style, children, ... more } = props;
    
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                ... style
            }}
            { ... more }>
            { children }
        </div>
    </>;
}