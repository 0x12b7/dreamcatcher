import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react";
import {rho} from "@style/unit/Rho";
import * as ColorPalette from "@style/ColorPalette";

export type NavButtonProps =
    & Omit<ComponentPropsWithRef<"div">, "children">
    & {
    children: [ReactNode, ReactNode];
};
export function NavButton(props: NavButtonProps): ReactNode {
    let {style, children, ... more} = props;

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                pointerEvents: "auto",
                cursor: "pointer",
                ... style
            }}
            {... more}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    color: ColorPalette.NEON_PURPLE,
                    fontSize: rho(2n),
                    fontWeight: "normal",
                    fontFamily: "departure-mono"
                }}>
                {children[0]}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    color: ColorPalette.TIMPERWOLD,
                    fontSize: rho(2n),
                    fontWeight: "normal",
                    fontFamily: "departure-mono"
                }}>
                {children[1]}
            </div>
        </div>
    </>;
}