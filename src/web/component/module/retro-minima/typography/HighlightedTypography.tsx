import type {ReactNode} from "react";
import type {CSSProperties as CssProps} from "react";
import {rho} from "@style/unit/Rho";
import * as ColorPalette from "@style/ColorPalette";

export type HighlightedTypographyProps = {
    fontSize?: CssProps["fontSize"];
    fontWeight?: CssProps["fontWeight"];
    children?: ReactNode;
};
export function HighlightedTypography(props: HighlightedTypographyProps): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                background: ColorPalette.TIMPERWOLD,
                overflowX: "hidden",
                overflowY: "hidden",
                padding: rho(1n)
            }}>
            <span
                style={{
                    fontSize: props.fontSize ?? rho(4n),
                    fontWeight: props.fontWeight ?? "normal",
                    fontFamily: "departure-mono",
                    color: ColorPalette.EEIRE_BLACK
                }}>
                {props.children}
            </span>
        </div>
    </>;
}