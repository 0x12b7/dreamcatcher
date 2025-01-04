import type { ReactNode } from "react";
import type { RProps } from "@root";
import { R } from "@root";

export type RStackProps =
    & RProps
    & {};

export function RStack({ style, children, ... more }: RStackProps): ReactNode {
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