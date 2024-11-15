import type {ReactNode} from "react";
import type {CSSProperties as Style} from "react";
import type {ComponentPropsWithRef as ReactProps} from "react";
import {ResponsiveAnchorPage} from "@component/page/ResponsiveAnchorPage";
import {RetroMinimaContainer} from "@component/lib/retro-minima/container/RetroMinimaContainer";
import {RetroMinimaChart} from "@component/lib/retro-minima/chart/RetroMinimaChart";
import * as ColorPalette from "../style/ColorPalette";

export function TalismanPage(): ReactNode {
    return <>
        <ResponsiveAnchorPage>
            <RetroMinimaContainer
                label="METADATA"
                style={{
                    width: 400,
                    height: 200
                }}>
                <TalismanPageTable>

                </TalismanPageTable>
            </RetroMinimaContainer>
        </ResponsiveAnchorPage>
    </>;
}

export type TalismanPageTableProps =
    & ReactProps<"div">
    & {};
export function TalismanPageTable(props: TalismanPageTableProps): ReactNode {
    const {style, children, ... more} = props;
    const __table: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        width: "100%",
        height: "100%",
        flexGrow: 1,
        fontSize: "1em",
        fontFamily: "electro-harmonix",
        fontWeight: "normal",
        color: ColorPalette.TIMPERWOLD,
        padding: 20,
        ... style
    };
    const __row: Style = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexGrow: 1,
        gap: 20
    };
    const __item: Style = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        flexGrow: 1
    };
    const __item__heading: Style = {
        ... __item,
        justifyContent: "center",
        background: ColorPalette.TIMPERWOLD,
        color: ColorPalette.EEIRE_BLACK
    };

    return <>
        <RetroMinimaChart
            w={600}
            h={300}
            points={[{
                timestamp: 0n,
                wickLow: 4,
                wickHigh: 10,
                open: 5,
                close: 6
            }, {
                timestamp: 5n,
                wickHigh: 20,
                open: 6,
                close: 8,
                wickLow: 6
            }, {
                timestamp: 10n,
                wickLow: 4,
                wickHigh: 15,
                open: 8,
                close: 20
            }]}/>

        <div style={__table} {... more}>
            <div style={__row}>
                <div style={__item__heading}>NAME</div>
                <div style={__item}>Blue Sky Capital</div>
            </div>
            <div style={__row}>
                <div style={__item__heading}>SYMBOL</div>
                <div style={__item}>BSC</div>
            </div>
        </div>
    </>;
}