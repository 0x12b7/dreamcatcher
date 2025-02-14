import type { ReactNode } from "react";
import { Center } from "@main";

export function C(props: C.Props): ReactNode {
    let { style, children, ...more } = props;
    
    return <>
        <Center
            style={{
                ...style
            }}
            { ...more }>
            { children }
        </Center>
    </>;
}

export namespace C {
    export type Props =
        & Center.Props;
}