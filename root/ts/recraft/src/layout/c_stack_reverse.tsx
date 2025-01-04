import type { ReactNode } from "react";
import type { CStackProps } from "@root";
import { CStack } from "@root";

export type CStackReverseProps =
    & CStackProps
    & {};

export function CStackReverse({ style, children, ... more }: CStackReverseProps): ReactNode {
    return <>
        <CStack
            style={{
                flexDirection: "column-reverse",
                justifyContent: "start",
                ... style
            }}
            { ... more }>
            { children }
        </CStack>
    </>;
}