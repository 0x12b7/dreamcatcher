import type {ReactNode} from "react";
import type {AnimationProps} from "@silk";
import type {FontProps} from "@silk";
import {useSpring} from "react-spring";
import {animated} from "react-spring";
import {rho} from "@style/unit/Rho";

export type StatProps =
    & AnimationProps
    & FontProps
    & {
    initialCount?: number;
    count?: number;
    precision?: number;
    prefix?: string;
    suffix?: string;
};
export function Stat(props: StatProps): ReactNode {
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
        useSpring({
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
        <animated.div
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
        </animated.div>
    </>;
}