import type {ReactNode} from "react";
import type {ComponentPropsWithRef as ReactComponentPropsWithRef} from "react";
import type {Device} from "../../hook/observer/window/Device";
import {useDevice} from "../../hook/observer/window/Device";

export function ResponsiveAnchorPage({
    navigation,
    style,
    children,
    ... more}:
        & ReactComponentPropsWithRef<"div">
        & {
        navigation?: ReactNode;
    }): ReactNode {
    const device: Device = useDevice();

    function size(): number {
        switch (device) {
            case "laptop": return 1024;
            case "tablet": return 768;
            case "mobile": return 320;
        }
    }

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                ... style
            }}
            {... more}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    width: size(),
                    height: "100%"
                }}>
                {navigation}
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
                    {children}
                </div>
            </div>
        </div>
    </>;
}