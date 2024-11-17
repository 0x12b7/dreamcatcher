import type {ReactNode} from "react";
import type {CSSProperties as Style} from "react";
import type {ComponentPropsWithRef as ReactComponentPropsWithRef} from "react";
import type {Device} from "../module/silk/hook/observer/Device";
import {useDevice} from "../module/silk/hook/observer/Device";
import * as ColorPalette from "../../style/ColorPalette";

export function ResponsiveAnchorPage({
    navigation,
    style,
    children,
    ... more}:
        & ReactComponentPropsWithRef<"div">
        & {
        navigation?: ReactNode;
    }): ReactNode {
    let device: Device = useDevice();
    let __wrapper: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: ColorPalette.EEIRE_BLACK,
        ... style
    } as const;
    let __responsiveWrapper: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width: size(),
        height: "100%"
    } as const;
    let __contentWrapper: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        flexGrow: 1
    } as const;

    function size(): number {
        switch (device) {
            case "laptop": return 1024;
            case "tablet": return 768;
            case "mobile": return 320;
        }
    }

    return <>
        <div style={__wrapper} {... more}>
            <div style={__responsiveWrapper}>
                {navigation}
                <div style={__contentWrapper}>
                    {children}
                </div>
            </div>
        </div>
    </>;
}