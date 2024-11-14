import type {ReactNode} from "react";
import type {CSSProperties as Css} from "react";
import type {ComponentPropsWithRef} from "react";

export function RetroMinimaButton({
    configuration,
    style,
    children,
    ... more}:
        & ComponentPropsWithRef<"div">
        & {
        configuration: {
            bg: string;
            edgeSize: `${string}px`;
            edgeSpacing: `${string}%`;
            edgeStyle: Css["borderStyle"];
            edgeColor: string;
        }
    }): ReactNode {
    let w: number = 200;
    let h: number = 200;
    let edgeProportion: number = 80;
    let edgeSpacing: number = 10;
    let topLeftW: number = (w / 100) * edgeProportion;
    let topLeftH: number = (h / 100) * edgeProportion;
    let topRightW: number = (w / 100) * edgeProportion;
    let topRightH: number = (h / 100) * edgeProportion;
    let bottomLeftW: number = (w / 100) * edgeProportion;
    let bottomLeftH: number = (h / 100) * edgeProportion;
    let bottomRightW: number = (w / 100) * edgeProportion;
    let bottomRightH: number = (h / 100) * edgeProportion;
    let css: Css = {};
    css.display = "flex";
    css.flexDirection = "row";
    css.justifyContent = "center";
    css.alignItems = "center";
    css.position = "relative";
    css.borderWidth = 1;
    css.borderStyle = "solid";
    css.borderColor = "#202020";
    css.width = w;
    css.height = h;
    let offset: number = css.borderWidth + edgeSpacing;

    return <>
        <div
            style={{
                ... css,
                ... style
            }}
            {... more}>
            <div
                style={{
                    position: "absolute",
                    left: -1,
                    top: -1,
                    background: "#121212",
                    width: 50,
                    aspectRatio: 1 / 1,
                    
                }}>
                    <div
                        style={{
                            borderTopWidth: 2.5,
                            borderTopStyle: configuration.edgeStyle,
                            borderTopColor: configuration.edgeColor,
                            borderLeftWidth: 2.5,
                            borderLeftStyle: configuration.edgeStyle,
                            borderLeftColor: configuration.edgeColor,
                            width: configuration.edgeSpacing,
                            height: configuration.edgeSpacing
                        }}/>
                </div>
        </div>
    </>;
}

export function RetroMinimaButtonAngle({
    configuration,
    style,
    children,
    ... more}: 
        & ComponentPropsWithRef<"div">
        & {
        configuration: {
            axis:
                | "top-left"
                | "top-right"
                | "bottom-left"
                | "bottom-right";
            width: number | string;
            style: 
                | Css["borderTopStyle"] 
                | Css["borderLeftStyle"]
                | Css["borderBottomStyle"]
                | Css["borderRightStyle"];
            color: string;
        };
    }): ReactNode {
    let css: Css = {};
    configuration.axis === "top-left" ? drawTopLeftBorder() :
    configuration.axis === "top-right" ? drawTopRightBorder() :
    configuration.axis === "bottom-left" ? drawBottomLeftBorder() :
    configuration.axis === "bottom-right" ? drawBottomRightBorder() :
    null;

    function drawTopLeftBorder(): void {
        drawTopBorder();
        drawLeftBorder();
        return;
    }

    function drawTopRightBorder(): void {
        drawTopBorder();
        drawRightBorder();
        return;
    }

    function drawBottomLeftBorder(): void {
        drawBottomBorder();
        drawLeftBorder();
        return;
    }

    function drawBottomRightBorder(): void {
        drawBottomBorder();
        drawRightBorder();
        return;
    }
        
    function drawTopBorder(): void {
        css.borderTopWidth = configuration.width;
        css.borderTopStyle = configuration.style;
        css.borderTopColor = configuration.color;
        return;
    }

    function drawBottomBorder(): void {
        css.borderBottomWidth = configuration.width;
        css.borderBottomStyle = configuration.style;
        css.borderBottomColor = configuration.color;
        return;
    }

    function drawLeftBorder(): void {
        css.borderLeftWidth = configuration.width;
        css.borderLeftStyle = configuration.style;
        css.borderLeftColor = configuration.color;
        return;
    }

    function drawRightBorder(): void {
        css.borderRightWidth = configuration.width;
        css.borderRightStyle = configuration.style;
        css.borderRightColor = configuration.color;
        return;
    }

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                background: "#121212",
                padding: 10,
                ... style
            }}
            {... more}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    ... css
                }}/>
        </div>
    </>;
}