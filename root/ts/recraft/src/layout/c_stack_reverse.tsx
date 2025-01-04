import type { ReactNode } from "react";
import type { CStackProps } from "@root";
import { CStack } from "@root";

export type CStackReverseProps =
    & CStackProps
    & {};

export function CStackReverse(props: CStackReverseProps): ReactNode {
    let { style, children, ... more } = props;

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