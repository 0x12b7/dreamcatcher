import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react";
import {rho} from "../../../../style/unit/Rho";
import * as RetroMinimaConfig from "../RetroMinimaConfig";
import * as ColorPalette from "../../../../style/ColorPalette";

export function RetroMinimaContainer({
    label,
    style,
    children,
    ... more}:
        & ComponentPropsWithRef<"div">
        & {
        label: string;
    }): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                ... style
            }}
            {... more}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%"
                }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        background: ColorPalette.TIMPERWOLD,
                        color: RetroMinimaConfig.BG_COLOR,
                        fontSize: rho(2n),
                        fontFamily: RetroMinimaConfig.FONT_FAMILY,
                        fontWeight: "normal",
                        padding: 5
                    }}>
                    {label}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: ColorPalette.GHOST_BLACK,
                    width: "100%",
                    height: "100%",
                    flexGrow: 1
                }}>
                {children}
            </div>
        </div>
    </>;
}