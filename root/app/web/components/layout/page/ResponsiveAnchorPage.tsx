import type {Device} from "->web.lib";
import {useDevice} from "->web.lib";
import * as ColorPalette from "->web.color-palette";
import * as WebLib from "->web.lib";

export type ResponsiveAnchorPageProps = {
    children?: [WebLib.Component, WebLib.Component];
};
export function ResponsiveAnchorPage(props: ResponsiveAnchorPageProps): WebLib.Component {
    let {children = []} = props;
    let device: Device = useDevice();

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100vm",
                height: "100vh",
                background: ColorPalette.EEIRE_BLACK
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    width:
                        device === "laptop" ? 1024 :
                        device === "tablet" ? 768 :
                        device === "mobile" ? 320 :
                        undefined,
                    height: "100%" 
                }}>
                {children[0]}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        flexGrow: 1
                    }}>
                    {children[1]}
                </div>
            </div>
        </div>
    </>;
}