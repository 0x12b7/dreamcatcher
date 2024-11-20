import * as Silk from "@silk";

export type AnimatedStatProps =
    & Silk.AnimationProps
    & Silk.AnimationDelayProps
    & {
    initialCount?: number;
    count?: number;
    precision?: number;
    prefix?: string;
    suffix?: string;
};
export function AnimatedStat(props: AnimatedStatProps): Silk.Component {
    props.initialCount ??= 0;
    props.count ??= 0;
    props.precision ??= 0;
    props.prefix ??= "";
    props.suffix ??= "";
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
        {spring.number.to(x => `${props.prefix} ${Number(x.toFixed(2)).toLocaleString()} ${props.suffix}`)}
    </>;
}