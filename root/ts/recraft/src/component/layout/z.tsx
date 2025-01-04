import type { ReactNode } from "react";
import type { CenterProps } from "@root";
import { Center } from "@root";

export type ZProps = 
    & CenterProps
    & {};

export function Z(props: ZProps): ReactNode {
    let { style, children, ... more } = props;
    
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