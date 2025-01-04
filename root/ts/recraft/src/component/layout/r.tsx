import type { ReactNode } from "react";
import type { CenterProps } from "@root";
import { Center } from "@root";

export type RProps =
    & CenterProps
    & {};

export function R(props: RProps): ReactNode {
    let { style, children, ... more } = props;
    
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