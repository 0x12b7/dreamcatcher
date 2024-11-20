import type {ReactNode} from "react";
import {LineChart} from "recharts";
import {Line} from "recharts";
import {XAxis} from "recharts";
import {YAxis} from "recharts"
import {ResponsiveContainer} from "recharts";
import {EdgedContainer} from "@component/container/EdgedContainer";
import {easings as Easings} from "react-spring";
import {animated} from "react-spring";
import {useSpring} from "react-spring";
import * as ColorPalette from "@style/ColorPalette";

export type VaultCardProps = {
    w: number;
    h: number;
    dataset: Array<{
        timestamp: bigint;
        price: number;
    }>;
};
export function VaultCard(props: VaultCardProps): ReactNode {
    let {w, h, dataset} = props;
    let now: bigint = dataset[dataset.length - 1].timestamp;

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                width: 600,
                height: 200
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    flexGrow: 1,
                    fontSize: "1em",
                    fontWeight: "normal",
                    fontFamily: "electro-harmonix",
                    color: ColorPalette.TIMPERWOLD,
                    paddingTop: 10,
                    paddingBottom: 10
                }}>
                Blue Sky Capital
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                }}>
                <VaultCardPnlCounter
                    label="24HR"
                    count={7.34}/>
                <VaultCardPnlCounter
                    label="WEEK"
                    count={27.37}/>
                <VaultCardPnlCounter
                    label="30DY"
                    count={-23.58}/>
                <VaultCardPnlCounter
                    label="YEAR"
                    count={-64.33}/>
            </div>
            <ResponsiveContainer
                width={w / 2.4}
                height={h / 4}>
                <LineChart
                    data={dataset}>
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke={ColorPalette.TIMPERWOLD}
                        strokeWidth={2.5}
                        strokeLinecap="square"
                        dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    </>;
}


// #region Pnl Counter

export type VaultCardPnlCounterProps = {
    label: string;
    count: number;
};
export function VaultCardPnlCounter(props: VaultCardPnlCounterProps): ReactNode {
    let {label, count} = props;
    let spring = useSpring({
        to: {
            number: count
        },
        from: {
            number: 0
        },
        reset: false,
        config: {
            duration: 2000,
            easing: Easings.easeInOutExpo
        }
    });

    function symbol(percentage: number): string {
        /**
         * moonshot
         * breakout
         * surge
         * rally
         * crab
         * dip
         * pullback
         * correction
         * crash
         * dead
         */
        return (
            percentage >= 20 ? "⥉" :
            percentage >= 10 ? "⇞" :
            percentage >= 5 ? "⤉" :
            percentage >= 1 ? "⇡" :
            percentage > -1 && percentage < 1 ? "⇢" :
            percentage <= -99 ? "🕱" :
            percentage <= -50 ? "⭍" :
            percentage <= -20 ? "⭽" :
            percentage <= -5 ? "⤈" :
            percentage <= -1 ? "⇣" :
            ""
        );
    }
    
    function color(percentage: number): string {
        return percentage > 0 ? ColorPalette.SPRING_GREEN : percentage < 0 ? ColorPalette.BITTER_SWEET : ColorPalette.TIMPERWOLD;
    }

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
                    color: ColorPalette.EEIRE_BLACK,
                    fontSize: "0.75em",
                    fontWeight: "normal",
                    fontFamily: "departure-mono"
                }}>
                {label}
            </div>
            <animated.div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    color: color(count),
                    fontSize: "0.75em",
                    fontWeight: "normal",
                    fontFamily: "departure-mono"
                }}>
                {spring.number.to(count => `${symbol(count)} ${Number(count.toFixed(2)).toLocaleString()} %`)}
            </animated.div>
        </div>    
    </>;

}