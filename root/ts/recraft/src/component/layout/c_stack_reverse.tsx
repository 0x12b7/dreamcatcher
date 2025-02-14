import type { ReactNode } from "react";
import { CStack } from "@main";

export type CStackReverseProps =
    & CStack.Props
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