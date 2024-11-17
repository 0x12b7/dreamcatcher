import type {ReactNode} from "react";
import type {SizeProps} from "@silk";
import type {MouseEventProps} from "@silk";
import type {KeyboardEventProps} from "@silk";
import {animated} from "react-spring";
import {createContext} from "react";

export const CanvasContext = createContext(null);

export type CanvasProps =
    & SizeProps
    & MouseEventProps
    & KeyboardEventProps
    & {};

export function Canvas(props: CanvasProps): ReactNode {
    let {
        w,
        h,
        p,
        m,
        g,
        minW,
        maxW,
        minH,
        maxH,
        pt,
        pr,
        pb,
        pl,
        mt,
        mr,
        mb,
        ml,
        aspectRatio,
        onClick,
        onContextMenu,
        onDoubleClick,
        onMouseDown,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onMouseOut,
        onMouseOver,
        onMouseUp
    } = props;
    return <>
        <CanvasContext.Provider
            value={null}>
            <animated.div
                onClick={onClick}
                onContextMenu={onContextMenu}
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

<Canvas
    w={200}
    h={600}>
    <CanvasItem
        x={0}
        y={50}>
        
    </CanvasItem>
</Canvas>