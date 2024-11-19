import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react";
import type {CSSProperties as Style} from "react";
import {rho} from "../../../../style/unit/Rho";
import * as ColorPalette from "../../../../style/ColorPalette";

export type RetroMinimaContainerProps =
    & ComponentPropsWithRef<"div">
    & {
    label: string;
};
export function RetroMinimaContainer(props: RetroMinimaContainerProps): ReactNode {
    let {label, style, children, ... more} = props;
    let __wrapper: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        ... style
    } as const;
    let __labelWrapper: Style = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        width: "100%"
    } as const;
    let __label: Style = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        background: ColorPalette.TIMPERWOLD,
        color: ColorPalette.TIMPERWOLD,
        fontSize: rho(2n),
        fontFamily: undefined,
        fontWeight: "normal",
        padding: 5
    } as const;
    let __container: Style = {
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
    } as const;

    return <>
        <div style={__wrapper} {... more}>
            <div style={__labelWrapper}>
                <div style={__label}>
                    {label}
                </div>
            </div>
            <div style={__container}>
                {children}
            </div>
        </div>
    </>;
}