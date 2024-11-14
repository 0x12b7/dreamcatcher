import type {ReactNode} from "react";
import type {CSSProperties as Style} from "react";
import * as ColorPalette from "../../../../style/ColorPalette";

export type RetroMinimaEdgedContainerProps = {
    w?: Style["width"]
    h?: Style["height"];
    p?: Style["padding"];
    m?: Style["margin"];
    bg?: string;
    borderWidth?: Style["borderWidth"];
    borderStyle?: Style["borderStyle"];
    borderColor?: Style["borderColor"];
    withTopLeft?: boolean;
    withTopRight?: boolean;
    withBottomLeft?: boolean;
    withBottomRight?: boolean;
    edgeSize?: number;
    edgeFill?: number;
    edgeColor?: string;
    edgeWidth?: number;
    edgeStyle?: 
        | Style["borderTopStyle"]
        | Style["borderBottomStyle"]
        | Style["borderLeftStyle"]
        | Style["borderRightStyle"];
    topLeftEdgeWidth?: number;
    topLeftEdgeStyle?:
        | Style["borderTopStyle"]
        | Style["borderBottomStyle"]
        | Style["borderLeftStyle"]
        | Style["borderRightStyle"];
    topLeftEdgeColor?: string;
    topRightEdgeWidth?: number;
    topRightEdgeStyle?:
        | Style["borderTopStyle"]
        | Style["borderBottomStyle"]
        | Style["borderLeftStyle"]
        | Style["borderRightStyle"];
    topRightEdgeColor?: string;
    bottomLeftEdgeWidth?: number;
    bottomLeftEdgeStyle?:
        | Style["borderTopStyle"]
        | Style["borderBottomStyle"]
        | Style["borderLeftStyle"]
        | Style["borderRightStyle"];
    bottomLeftEdgeColor?: string;
    bottomRightEdgeWidth?: number;
    bottomRightEdgeStyle?:
        | Style["borderTopStyle"]
        | Style["borderBottomStyle"]
        | Style["borderLeftStyle"]
        | Style["borderRightStyle"];
    bottomRightEdgeColor?: string;
    children?: ReactNode;
};
export function RetroMinimaEdgedContainer(props: RetroMinimaEdgedContainerProps): ReactNode {
    const {
        w = 0,
        h = 0,
        p = 10,
        m = 0,
        bg = ColorPalette.EEIRE_BLACK,
        borderWidth = 1,
        borderStyle = "solid",
        borderColor = ColorPalette.GHOST_BLACK,
        withTopLeft,
        withTopRight,
        withBottomLeft,
        withBottomRight,
        edgeSize = 40,
        edgeFill = 50,
        edgeColor = ColorPalette.TIMPERWOLD,
        edgeWidth = 2.5,
        edgeStyle = "solid",
        topLeftEdgeWidth,
        topLeftEdgeStyle,
        topLeftEdgeColor,
        topRightEdgeWidth,
        topRightEdgeStyle,
        topRightEdgeColor,
        bottomLeftEdgeWidth,
        bottomLeftEdgeStyle,
        bottomLeftEdgeColor,
        bottomRightEdgeWidth,
        bottomRightEdgeStyle,
        bottomRightEdgeColor,
        children
    } = props;
    const offset: number = -borderWidth;
    const proportion: string = `${edgeFill}%`;
    const edgeContainerStyle: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: bg,
        width: edgeSize,
        aspectRatio: 1 / 1,
        position: "absolute"
    };
    const edgeStyle_: Style = {
        width: proportion,
        height: proportion
    };

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                borderWidth: borderWidth,
                borderStyle: borderStyle,
                borderColor: borderColor,

            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    width: w,
                    height: h,
                    padding: p,
                    margin: m,
                    zIndex: 1
                }}>
                {children}
            </div>
            <div
                style={{
                    ... edgeContainerStyle,
                    left: offset,
                    top: offset,
                    opacity: withTopLeft ? 1 : 0,
                    justifyContent: "start",
                    alignItems: "start"
                }}>
                <div
                    style={{
                        ... edgeStyle_,
                        borderTopWidth: topLeftEdgeWidth ?? edgeWidth,
                        borderTopStyle: topLeftEdgeStyle ?? edgeStyle,
                        borderTopColor: topLeftEdgeColor ?? edgeColor,
                        borderLeftWidth: topLeftEdgeWidth ?? edgeWidth,
                        borderLeftStyle: topLeftEdgeStyle ?? edgeStyle,
                        borderLeftColor: topLeftEdgeColor ?? edgeColor
                    }}/>
            </div>
            <div
                style={{
                    ... edgeContainerStyle,
                    right: offset,
                    top: offset,
                    opacity: withTopRight ? 1 : 0,
                    justifyContent: "start",
                    alignItems: "end"
                }}>
                <div
                    style={{
                        ... edgeStyle_,
                        borderTopWidth: topRightEdgeWidth ?? edgeWidth,
                        borderTopStyle: topRightEdgeStyle ?? edgeStyle,
                        borderTopColor: topRightEdgeColor ?? edgeColor,
                        borderRightWidth: topRightEdgeWidth ?? edgeWidth,
                        borderRightStyle: topRightEdgeStyle ?? edgeStyle,
                        borderRightColor: topRightEdgeColor ?? edgeColor
                    }}/>
            </div>
            <div
                style={{
                    ... edgeContainerStyle,
                    left: offset,
                    bottom: offset,
                    opacity: withBottomLeft ? 1 : 0,
                    justifyContent: "end",
                    alignItems: "start"
                }}>
                <div
                    style={{
                        ... edgeStyle_,
                        borderBottomWidth: bottomLeftEdgeWidth ?? edgeWidth,
                        borderBottomStyle: bottomLeftEdgeStyle ?? edgeStyle,
                        borderBottomColor: bottomLeftEdgeColor ?? edgeColor,
                        borderLeftWidth: bottomLeftEdgeWidth ?? edgeWidth,
                        borderLeftStyle: bottomLeftEdgeStyle ?? edgeStyle,
                        borderLeftColor: bottomLeftEdgeColor ?? edgeColor
                    }}/>
            </div>
            <div
                style={{
                    ... edgeContainerStyle,
                    right: offset,
                    bottom: offset,
                    opacity: withBottomRight ? 1 : 0,
                    justifyContent: "end",
                    alignItems: "end"
                }}>
                <div
                    style={{
                        ... edgeStyle_,
                        borderBottomWidth: bottomRightEdgeWidth ?? edgeWidth,
                        borderBottomStyle: bottomRightEdgeStyle ?? edgeStyle,
                        borderBottomColor: bottomRightEdgeColor ?? edgeColor,
                        borderRightWidth: bottomRightEdgeWidth ?? edgeWidth,
                        borderRightStyle: bottomRightEdgeStyle ?? edgeStyle,
                        borderRightColor: bottomRightEdgeColor ?? edgeColor
                    }}/>
            </div>
        </div>
    </>;
}