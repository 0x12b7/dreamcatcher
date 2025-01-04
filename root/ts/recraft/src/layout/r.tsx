import type { ReactNode } from "react";
import type { CenterProps } from "@root";
import { Center } from "@root";

export type RProps =
    & CenterProps
    & {};

export function R({ style, children, ... more }: RProps): ReactNode {
    return <>
        <Center
            style={{
                flexDirection: "row",
                ... style
            }}
            { ... more }>
            { children }
        </Center>
    </>;
}