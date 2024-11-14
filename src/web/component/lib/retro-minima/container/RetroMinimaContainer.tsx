import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react";
import {rho} from "../../../../style/unit/Rho";
import * as RetroMinimaConfig from "../RetroMinimaConfig";

export function RetroMinimaContainer({
    style,
    children,
    ... more}:
        & ComponentPropsWithRef<"div">
        & {}): ReactNode {
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
                        background: RetroMinimaConfig.PRIMARY_COLOR,
                        color: RetroMinimaConfig.BG_COLOR,
                        fontSize: rho(2n),
                        fontFamily: RetroMinimaConfig.FONT_FAMILY,
                        fontWeight: "normal",
                        padding: 5
                    }}>
                    TRANSACTION_VOLUME
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
                    borderColor: RetroMinimaConfig.PRIMARY_COLOR,
                    width: "100%",
                    height: "100%",
                    flexGrow: 1
                }}>

            </div>
        </div>
    </>;
}