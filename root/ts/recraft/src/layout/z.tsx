import type { ReactNode } from "react";
import type { CenterProps } from "@root";
import { Center } from "@root";

export type ZProps = 
    & CenterProps
    & {};

export function Z({ style, children, ... more }: ZProps): ReactNode {
    return <>
        <Center
            style={{
                position: "relative",
                ... style
            }}
            { ... more }>
            { children }
        </Center>
    </>;
}