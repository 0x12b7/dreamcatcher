import {useEffect, useState, type ReactNode} from "react";
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
import { VStackCounterWithBottomLabel } from "@component/view/VStackCounterWithBottomLabel";
import { easings } from "react-spring";
import { HorizontalMultiModeContainer } from "@component/module/silk/container/HorizontalMultiModeContainer";

export function DaoPage(): ReactNode {
    let [mode, setMode] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => setMode(1), 2500);
    }, []);

    return <>
        <ResponsiveAnchorPage>
            <HorizontalMultiModeContainer
                mode={mode}
                w={800}
                h={400}>
                <>HELLO_WORLD</>
                <>HI THERE</>
            </HorizontalMultiModeContainer>

        </ResponsiveAnchorPage>
    </>;
}
