import type { ReactNode } from "react";
import type { RStackProps } from "@root";
import { RStack } from "@root";

export type RStackReverseProps =
    & RStackProps
    & {};

export function RStackReverse(props: RStackReverseProps): ReactNode {
    let { style, children, ... more } = props;
    
    return <>
        <RStack
            style={{
                flexDirection: "row-reverse",
                justifyContent: "start",
                ... style
            }}
            { ... more }>
            { children }
        </RStack>
    </>;
}