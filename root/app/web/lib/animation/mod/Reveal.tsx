import * as WebLib from "->web.lib";

export type RevealProps = 
    & WebLib.AnimationProps
    & WebLib.AnimationDelayProps
    & WebLib.ParentProps
    & {};
export function Reveal(props: RevealProps): WebLib.Component {
    let [opacitySpring, setOpacitySpring] = 
        WebLib.useSpring(() => ({
            opacity: 0
        }));

    WebLib.useEffect(() => {
        setOpacitySpring.start({opacity: 1, ... props.animation});
        return;
    }, []);

    return <>
        <WebLib.animated.div
            style={{
                display: "contents",
                ... opacitySpring
            }}>
            {props.children}
        </WebLib.animated.div>
    </>;
}