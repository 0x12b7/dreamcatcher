import type {ReactNode} from "react";
import type {CSSProperties as Style} from "react";
import type {ComponentPropsWithRef as ReactProps} from "react";
import {ResponsiveAnchorPage} from "@component/page/ResponsiveAnchorPage";
import {RetroMinimaContainer} from "@component/module/retro-minima/container/RetroMinimaContainer";
import {RetroMinimaPriceChart} from "@component/module/retro-minima/chart/RetroMinimaPriceChart";
import * as ColorPalette from "../style/ColorPalette";
import {Sprite} from "@component/asset/Sprite";
import { Table } from "@component/table/Table";
import { TableHeading } from "@component/table/TableHeading";
import { TableItem } from "@component/table/TableItem";
import { VaultCard } from "@component/card/VaultCard";
import { Window } from "@component/window/Window";

export function TalismanPage(): ReactNode {
    return <>
        <ResponsiveAnchorPage>
            <Window
                initW={200}
                initH={200}
                initX={0}
                initY={0}>

            </Window>
        </ResponsiveAnchorPage>
    </>;
}