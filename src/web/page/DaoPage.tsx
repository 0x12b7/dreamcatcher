import {useEffect, useState, type ReactNode} from "react";
import type {CSSProperties as Style} from "react";
import type {ComponentPropsWithRef as ReactProps} from "react";
import {ResponsiveAnchorPage} from "@component/page/ResponsiveAnchorPage";
import {RetroMinimaContainer} from "@component/module/retro-minima_/container/RetroMinimaContainer";
import {RetroMinimaPriceChart} from "@component/module/retro-minima_/chart/RetroMinimaPriceChart";
import * as ColorPalette from "../style/ColorPalette";
import {Sprite} from "@component/asset/Sprite";
import { Table } from "@component/table/Table";
import { TableHeading } from "@component/table/TableHeading";
import { TableItem } from "@component/table/TableItem";
import { VaultCard } from "@component/card/VaultCard";
import { Window } from "@component/window/Window";
import { VStackCounterWithBottomLabel } from "@component/view/VStackCounterWithBottomLabel";
import { easings } from "react-spring";
import { HighlightedTypography } from "@component/module/retro-minima/typography/HighlightedTypography";
import { rho } from "@style/unit/Rho";

export function DaoPage(): ReactNode {
    let [mode, setMode] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => setMode(1), 2500);
    }, []);

    return <>
        <ResponsiveAnchorPage>
            <HighlightedTypography>
                HELLO_WORLD
            </HighlightedTypography>

        </ResponsiveAnchorPage>
    </>;
}