import type {ReactNode} from "react";
import type {CSSProperties as Style} from "react";
import * as ColorPalette from "../../../../style/ColorPalette";

export type RetroMinimaCandlestickProps = {
    outlineColor: string;
    bodyW?: number;
    bodyH?: number;
    bodyColor: string;
    topWickW?: number;
    topWickH?: number;
    bottomWickW?: number;
    bottomWickH?: number;
    wickColor: string;
    distance: number;
};
export function RetroMinimaCandlestick(props: RetroMinimaCandlestickProps): ReactNode {
    const {
        outlineColor,
        bodyW = 5,
        bodyH = 0,
        bodyColor,
        topWickW = 1,
        topWickH = 0,
        bottomWickW = 1,
        bottomWickH = 0,
        wickColor = ColorPalette.TIMPERWOLD,
        distance
    } = props;
    const centerStyle: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    };
    const containerStyle: Style = {
        ... centerStyle,
        position: "absolute",
        bottom: distance
    };
    const topWickStyle: Style = {
        ... centerStyle,
        width: topWickW,
        height: topWickH,
        background: wickColor
    };
    const bottomWickStyle: Style = {
        width: bottomWickW,
        height: bottomWickH,
        background: wickColor
    };
    const bodyStyle: Style = {
        width: bodyW,
        height: bodyH,
        background: bodyColor,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: outlineColor
    };

    return <>
        <div style={containerStyle}>
            <div style={topWickStyle}/>
            <div style={bodyStyle}/>
            <div style={bottomWickStyle}/>
        </div>
    </>;
}