import * as Silk from "@silk";
import {rho} from "@style/unit/Rho";

export type StatProps =
    & Silk.AnimationProps
    & Silk.AnimationDelayProps
    & Silk.FontProps
    & {
    initialCount?: number;
    count?: number;
    precision?: number;
    prefix?: string;
    suffix?: string;
};
export function Stat(props: StatProps): Silk.Component {
    props.initialCount ??= 0;
    props.count ??= 0;
    props.precision ??= 0;
    props.prefix ??= "";
    props.suffix ??= "";
    props.fontSize ??= rho(2n);
    props.fontWeight ??= "normal";
    props.fontFamily ??= "monospace";
    props.animation ??= {};
    let {delay, ... rsAnimation} = props.animation;
    let spring = 
        Silk.useSpring({
            to: {
                number: props.count
            },
            from: {
                number: props.initialCount
            },
            reset: false,
            config: rsAnimation,
            delay: delay
        });

    return <>
        <Silk.animated.div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: props.fontSize,
                fontWeight: props.fontWeight,
                fontFamily: props.fontFamily
            }}>
            {spring.number.to(x => `${props.prefix} ${Number(x.toFixed(2)).toLocaleString()} ${props.suffix}`)}
        </Silk.animated.div>
    </>;
}