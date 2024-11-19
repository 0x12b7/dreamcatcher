import type {ReactNode} from "react";
import type {AnimationProps} from "@silk";
import {useSpring} from "react-spring";
import {animated} from "react-spring";
import * as ColorPalette from "@style/ColorPalette";
import * as Percentage from "../../util/Percentage";

export type PnlCounterProps = 
    & AnimationProps
    & {
    label: string;
    count: number;
};
export function PnlCounter(props: PnlCounterProps): ReactNode {
    let {label, count, animation} = props;
    let spring = useSpring({
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
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                flexGrow: 1,
                gap: 10
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 5,
                    paddingRight: 5,
                    background: ColorPalette.TIMPERWOLD,
                    color: ColorPalette.EEIRE_BLACK
                }}>
                {label}
            </div>
            <animated.div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    color: Percentage.color(count)
                }}>
                {spring.number.to(count => `${Percentage.symbol(count)} ${Number(count.toFixed(2)).toLocaleString()} %`)}
            </animated.div>
        </div>    
    </>;
}