import type {ReactNode} from "react";
import type {CSSProperties as CssProps} from "react";
import {rho} from "@style/unit/Rho";
import * as ColorPalette from "@style/ColorPalette";

export type TypographyProps = {
    fontSize?: CssProps["fontSize"];
    fontWeight?: CssProps["fontWeight"];
    children?: ReactNode;
};
export function Typography(props: TypographyProps): ReactNode {
    return <>
        <span
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: props.fontSize ?? rho(4n),
                fontWeight: props.fontWeight ?? "normal",
                fontFamily: "departure-mono",
                color: ColorPalette.TIMPERWOLD,
                padding: rho(1n)
            }}>
            {props.children}
        </span>
    </>;
}