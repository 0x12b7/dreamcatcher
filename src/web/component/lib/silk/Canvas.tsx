import type {ReactNode} from "react";
import {animated} from "react-spring";

export function Canvas(): ReactNode {
    
    return <>
        <animated.div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                position: "relative"
            }}>

        </animated.div>
    </>;
}