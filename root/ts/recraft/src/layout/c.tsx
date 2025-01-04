import type { ReactNode } from "react";
import type { CenterProps } from "@root";
import { Center } from "@root";

export type CProps =
    & CenterProps
    & {};

export function C(props: CProps): ReactNode {
    let { style, children, ... more } = props;
    
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