import * as WebLib from "->web.lib";

export type HideProps =
    & WebLib.AnimationProps
    & WebLib.AnimationDelayProps
    & WebLib.ParentProps
    & {};
export function Hide(props: HideProps): WebLib.Component {
    let [opacitySpring, setOpacitySpring] =
        WebLib.useSpring(() => ({
            opacity: 1
        }));

    WebLib.useEffect(() => {
        setOpacitySpring.start({opacity: 0, ... props.animation});
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