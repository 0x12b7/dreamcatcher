import type { ReactNode } from "react";
import type { CProps } from "@root";
import { C } from "@root";

export type CStackProps =
    & CProps
    & {};

export function CStack({ style, children, ... more }: CStackProps): ReactNode {
    return <>
        <C
            style={{
                justifyContent: "start",
                ... style
            }}
            { ... more }>
            { children }
        </C>
    </>;
}