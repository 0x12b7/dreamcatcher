import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

export type SpacerProps = 
    & ComponentPropsWithRef<"div">
    & {};

export function Spacer(props: SpacerProps): ReactNode {
    let { style, children, ... more } = props;
    
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