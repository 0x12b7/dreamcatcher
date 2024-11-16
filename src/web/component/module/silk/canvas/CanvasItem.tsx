import type {ReactNode} from "react";
import type {PositionProps} from "@silk";
import type {AnimationProps} from "@silk";
import type {ParentProps} from "@silk";
import {animated} from "react-spring";
import {useSpring} from "react-spring";
import {useEffect} from "react";

export type CanvasItemProps =
    & PositionProps
    & AnimationProps
    & ParentProps
    & {};

export function CanvasItem(props: CanvasItemProps): ReactNode {
    let {x = 0, y = 0, z = 0n, animation, children} = props;
    let [spring, setSpring] = useSpring(() => ({top: y, left: x, zIndex: Number(z)}));

    useEffect(() => {
        setSpring.start({top: y, left: x, zIndex: Number(z), ... animation});
        return;
    }, [x, y, z]);

    return <>
        <animated.div 
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                position: "absolute",
                ... spring
            }}>
            {children}
        </animated.div>
    </>;
}


<CanvasItem
    w={500}
    h={200}
    pt={20}
    x={50}
    y={0}
    animation={{
        delay: 50,
        duration: 5000
    }}>
    
</CanvasItem>