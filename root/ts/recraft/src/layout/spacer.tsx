import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

export type SpacerProps = 
    & ComponentPropsWithRef<"div">
    & {};

export function Spacer({ style, children, ... more }: SpacerProps): ReactNode {
    return <>
        <div
            style={{
                flex: 1,
                ... style
            }}
            { ... more }>
            { children }
        </div>
    </>;
}