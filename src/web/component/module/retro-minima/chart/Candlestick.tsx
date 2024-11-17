import type {ReactNode} from "react";
import type {CSSProperties as Style} from "react";

export type CandlestickProps = {
    color?: string;
    bodyW?: number;
    bodyH?: number;
    topWickW?: number;
    topWickH?: number;
    bottomWickW?: number;
    bottomWickH?: number;
    x?: number;
    y?: number;
};

export function Candlestick(props: CandlestickProps): ReactNode {
    let {
        color,
        bodyW,
        bodyH,
        topWickW,
        topWickH,
        bottomWickW,
        bottomWickH,
        x,
        y
    } = props;
    let container$: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: x,
        bottom: y
    };
    let topWick$: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: topWickW,
        height: topWickH,
        background: color
    };
    let body$: Style = {
        width: bodyW,
        height: bodyH,
        background: color,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: color
    };
    let bottomWick$: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: bottomWickW,
        height: bottomWickH,
        background: color
    };

    return <>
        <div style={container$}>
            <div style={topWick$}/>
            <div style={body$}/>
            <div style={bottomWick$}/>
        </div>
    </>;
}