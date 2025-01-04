import type { ReactNode } from "react";
import type { CenterProps } from "@root";
import { Center } from "@root";

export type CProps =
    & CenterProps
    & {};

export function C({ style, children, ... more }: CProps): ReactNode {
    return <>
        <Center
            style={{
                ... style
            }}
            { ... more }>
            { children }
        </Center>
    </>;
}