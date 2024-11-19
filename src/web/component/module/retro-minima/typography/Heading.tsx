import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react";
import {rho} from "@style/unit/Rho";
import * as ColorPalette from "@style/ColorPalette";

export type HeadingProps = 
    & ComponentPropsWithRef<"div">
    & {};
export function Heading(props: HeadingProps): ReactNode {
    let {style, children, ... more} = props;
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: rho(10n),
                fontWeight: "normal",
                fontFamily: "departure-mono",
                color: ColorPalette.TIMPERWOLD,
                margin: 10,
                ... style
            }}
            {... more}>
            {children}
        </div>
    </>;
}