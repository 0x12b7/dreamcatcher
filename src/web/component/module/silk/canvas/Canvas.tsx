import type {ReactNode} from "react";
import type {SizeProps} from "@silk";
import {animated} from "react-spring";
import {createContext} from "react";

export const CanvasContext = createContext(null);

export type CanvasProps =
    & SizeProps
    & {};

export function Canvas(props: CanvasProps): ReactNode {
    let {} = props;
    return <>
        <CanvasContext.Provider
            value={null}>
            <animated.div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    position: "relative"
                }}>

            </animated.div>
        </CanvasContext.Provider>
    </>;
}