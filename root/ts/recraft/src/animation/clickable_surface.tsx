import type { ReactNode } from "react";
import type { SpringConfig } from "react-spring";
import type { ComponentPropsWithRef } from "react-spring";
import { animated } from "react-spring";
import { useSpring } from "react-spring";

export type ClickableSurfaceNativeProps = {
    onEnterColor: string;
    onLeaveColor: string;
    onMouseEnterAnimation?: SpringConfig;
    onMouseLeaveAnimation?: SpringConfig;
};

export type ClickableSurfaceProps = 
    & ComponentPropsWithRef<"div">
    & ClickableSurfaceNativeProps
    & {};

export function ClickableSurface(props: ClickableSurfaceProps): ReactNode {
    let {
        onEnterColor,
        onLeaveColor,
        onMouseEnterAnimation,
        onMouseLeaveAnimation,
        style,
        children,
        ... more
    } = props;
    let spring = useSpring(() => ({ background: onLeaveColor }));
    
    return <>
        <animated.div
            onMouseEnter={ () => spring[1].start({ background: onEnterColor, ... onMouseEnterAnimation }) }
            onMouseLeave={ () => spring[1].start({ background: onLeaveColor, ... onMouseLeaveAnimation }) }
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                ... spring[0],
                ... style
            }}
            { ... more }>
            { children }
        </animated.div>
    </>;
}