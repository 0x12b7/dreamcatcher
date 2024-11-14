import type {ReactNode} from "react";
import {ResponsiveAnchorPage} from "@component/page/ResponsiveAnchorPage";
import {RetroMinimaContainer} from "@component/lib/retro-minima/container/RetroMinimaContainer";
import {RetroMinimaEdgedContainer} from "@component/lib/retro-minima/container/RetroMinimaEdgedContainer";

// TODO Rename this
export function TalismanPage(): ReactNode {
    return <>
        <ResponsiveAnchorPage>

            <RetroMinimaEdgedContainer
                withTopLeft
                withBottomRight
                w={200}
                h={200}>
                Hello World My name is  Joe Hanes.
            </RetroMinimaEdgedContainer>

            <RetroMinimaContainer
                style={{
                    width: 400,
                    aspectRatio: 4 / 1
                }}
                color="">

            </RetroMinimaContainer>

            <RetroMinimaContainer
                style={{
                    width: 300,
                    aspectRatio: 4 / 1
                }}
                color="">

            </RetroMinimaContainer>
        </ResponsiveAnchorPage>
    </>;
}

