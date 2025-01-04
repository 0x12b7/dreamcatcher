import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

export type CenterProps =
    & ComponentPropsWithRef<"div">
    & {};

export function Center({ style, children, ... more }: CenterProps): ReactNode {
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