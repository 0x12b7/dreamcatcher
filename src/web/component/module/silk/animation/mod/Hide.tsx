import * as Silk from "@silk";

export type HideProps =
    & Silk.AnimationProps
    & Silk.AnimationDelayProps
    & Silk.ParentProps
    & {};
export function Hide(props: HideProps): Silk.Component {
    let [opacitySpring, setOpacitySpring] =
        Silk.useSpring(() => ({
            opacity: 1
        }));

    Silk.useEffect(() => {
        setOpacitySpring.start({opacity: 0, ... props.animation});
        return;
    }, []);

    return <>
        <Silk.animated.div
            style={{
                display: "contents",
                ... opacitySpring
            }}>
            {props.children}
        </Silk.animated.div>
    </>;
}