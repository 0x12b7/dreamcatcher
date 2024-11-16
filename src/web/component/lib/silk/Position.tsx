import type {ReactNode} from "react";
import type {SpringConfig} from "react-spring";
import {animated} from "react-spring";
import {useSpring} from "react-spring";
import {useEffect} from "react";

export type PositionProps = {
    x?: number;
    y?: number;
    animation?:
        & SpringConfig
        & {
        delay?: number;
    };
    children?: ReactNode;
};

export function Position(props: PositionProps): ReactNode {
    let {x = 0, y = 0, animation, children} = props;
    let [spring, setSpring] = useSpring(() => ({top: y, left: x}));

    useEffect(() => {
        setSpring.start({top: y, left: x, ... animation});
        return;
    }, [x, y]);

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


<Position
    x={50}
    y={0}
    animation={{
        delay: 50,
        duration: 5000
    }}>
    
</Position>