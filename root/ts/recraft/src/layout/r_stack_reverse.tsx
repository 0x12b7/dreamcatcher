import type { ReactNode } from "react";
import type { RStackProps } from "@root";
import { RStack } from "@root";

export type RStackReverseProps =
    & RStackProps
    & {};

export function RStackReverse({ style, children, ... more }: RStackReverseProps): ReactNode {
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