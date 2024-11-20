import * as Silk from "@silk";

export type RevealProps = 
    & Silk.AnimationProps
    & Silk.AnimationDelayProps
    & Silk.ParentProps
    & {};
export function Reveal(props: RevealProps): Silk.Component {
    let [opacitySpring, setOpacitySpring] = 
        Silk.useSpring(() => ({
            opacity: 0
        }));

    Silk.useEffect(() => {
        setOpacitySpring.start({opacity: 1, ... props.animation});
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