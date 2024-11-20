import type {ReactNode} from "react";
import type {AnimationProps} from "@silk";
import {useSpring} from "react-spring";
import {animated} from "react-spring";
import {rho} from "@style/unit/Rho";
import * as ColorPalette from "@style/ColorPalette";

export type VStackCounterWithBottomLabel =
    & AnimationProps
    & {
    label: string;
    count: number;
    precision?: bigint;
    prefix?: string;
    suffix?: string;
};
export function VStackCounterWithBottomLabel(props: VStackCounterWithBottomLabel): ReactNode {
    let {
        label, 
        count, 
        precision = 0n, 
        prefix = "", 
        suffix = "", 
        animation,
        ... more
    } = props;
    let spring = 
        useSpring({
            to: {
                number: count
            },
            from: {
                number: 0
            },
            reset: false,
            config: animation
        });

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 10
            }}
            {... more}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    flexGrow: 1
                }}>
                <animated.div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: rho(5n),
                        fontWeight: "normal",
                        fontFamily: "departure-mono",
                        color: ColorPalette.TIMPERWOLD
                    }}>
                    {spring.number.to(count => `${prefix} ${Number(count.toFixed(Number(precision))).toLocaleString()} ${suffix}`)}
                </animated.div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    flexGrow: 1
                }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: rho(2n),
                        fontWeight: "normal",
                        fontFamily: "departure-mono",
                        color: ColorPalette.TIMPERWOLD
                    }}>
                    {label}
                </div>
            </div>
        </div>
    </>;
}