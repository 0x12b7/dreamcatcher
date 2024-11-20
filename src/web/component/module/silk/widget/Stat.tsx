import type {ReactNode} from "react";
import type {AnimationProps} from "@silk";
import type {FontProps} from "@silk";
import {easings as Easings} from "react-spring";
import {useSpring} from "react-spring";
import {animated} from "react-spring";
import {rho} from "@style/unit/Rho";

export type StatProps =
    & AnimationProps
    & FontProps
    & {
    count?: number;
    precision?: number;
    prefix?: string;
    suffix?: string;
};
export function Stat(props: StatProps): ReactNode {
    props.count ??= 0;
    props.precision ??= 0;
    props.prefix ??= "";
    props.suffix ??= "";
    props.fontSize ??= rho(2n);
    props.fontWeight ??= "normal";
    props.fontFamily ??= "monospace";
    props.animation ??= {
        duration: 2500,
        easing: Easings.easeInOutExpo
    };
    let spring = 
        useSpring({
            to: {
                number: props.count
            },
            from: {
                number: 0
            },
            reset: false,
            config: (props.animation as any)
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