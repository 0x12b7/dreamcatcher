import type {ReactNode} from "react";
import type {CSSProperties as Style} from "react";

export type RetroMinimaCandlestickProps = {
    outlineColor: string;
    bodyW: number | string;
    bodyH: number | string;
    bodyColor: string;
    topWickW: number | string;
    topWickH: number | string;
    bottomWickW: number | string;
    bottomWickH: number | string;
    wickColor: string;
    distance: number; /// distance from the bottom of the candlestick slot.
};

export function RetroMinimaCandlestick(props: RetroMinimaCandlestickProps): ReactNode {
    let {outlineColor, bodyW, bodyH, bodyColor, topWickW, topWickH, bottomWickW, bottomWickH, wickColor, distance} = props;
    let __center: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    } as const;
    let __container: Style = {
        ... __center,
        position: "absolute",
        bottom: distance
    } as const;
    let __topWick: Style = {
        ... __center,
        width: topWickW,
        height: topWickH,
        background: wickColor
    } as const;
    let __bottomWick: Style = {
        ... __center,
        width: bottomWickW,
        height: bottomWickH,
        background: wickColor
    } as const;
    let __body: Style = {
        width: bodyW,
        height: bodyH,
        background: bodyColor,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: outlineColor
    } as const;

    return <>
        <div style={__container}>
            <div style={__topWick}/>
            <div style={__body}/>
            <div style={__bottomWick}/>
        </div>
    </>;
}