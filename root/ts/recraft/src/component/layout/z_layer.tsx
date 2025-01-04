import type { ReactNode } from "react";
import type { CenterProps } from "@root";
import { Center } from "@root";

export type ZLayerProps =
    & CenterProps
    & {};

export function ZLayer(props: ZLayerProps): ReactNode {
    let { style, children, ... more } = props;
    
    return <>
        <Center
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                ... style
            }}
            { ... more }>
            { children }
        </Center>
    </>;
}