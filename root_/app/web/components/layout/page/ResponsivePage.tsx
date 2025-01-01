import {toArray} from "->common";
import * as ColorPalette from "->web.color-palette";
import * as WebLib from "->web.lib";

export type ResponsivePageProps = 
    & Pick<WebLib.BackgroundProps,
        | "background">
    & {
    children?: 
        | WebLib.Component 
        | Array<WebLib.Component>;      
};
export function ResponsivePage(props: ResponsivePageProps): WebLib.Component {
    let device: WebLib.Device = WebLib.useDevice();

    return <>
        <div /// container
            style={{
                display: "flex",
                flexDirection: "column",
                justifyTracks: "start",
                alignItems: "center",
                width: "100%",
                minHeight: "100vh",
                overflowX: "hidden",
                overflowY: "auto",
                background: props.background ?? ColorPalette.EEIRE_BLACK
            }}>
            <div /// responsive content container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    width:
                        device === "laptop" ? 1024 :
                        device === "tablet" ? 768 :
                        device === "mobile" ? 320 :
                        "100%",
                    minHeight: "100%"
                }}>
                {toArray(props.children).map(child =>
                <div /// slide
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        height: "100vh"
                    }}>
                    {child}
                </div>)}
            </div>
        </div>
    </>;
}