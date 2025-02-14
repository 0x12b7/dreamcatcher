import { 
    type ReactNode,
    useEffect
} from "react";
import {
    type SpringConfig,
    type ComponentPropsWithRef,
    config as Configuration,
    animated,
    useSpring
} from "react-spring";

export function Reveal(props: Reveal.Props): ReactNode {
    let {
        config=Configuration.default,
        style,
        children,
        ...more
    } = props;
    let [spring, setSpring] = useSpring(() => ({
        opacity: 0
    }));

    useEffect(() => {
        setSpring.start({ opacity: 1, ...config });
        return;
    }, []);

    return <>
        <animated.div
            style={{
                ...spring
            }}
            { ...more }>
            { children }
        </animated.div>
    </>;
}

export namespace Reveal {
    export type Props =
        & ComponentPropsWithRef<"div">
        & {
        config: SpringConfig;
    };
}