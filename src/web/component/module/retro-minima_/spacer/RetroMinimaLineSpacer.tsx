import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react";
import type {CSSProperties as Style} from "react";
import * as ColorPalette from "../../../../style/ColorPalette";

export type RetroMinimaLineSpacerProps = 
    & ComponentPropsWithRef<"div">
    & {
    configuration: {
        axis?: "x" | "y";
        size?: number;
    };
};
export function RetroMinimaLineSpacer(props: RetroMinimaLineSpacerProps): ReactNode {
    const {configuration, style, children, ... more} = props;
    const style_: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: ColorPalette.TIMPERWOLD
    };
    if (configuration.axis === "y") {
        style_.width = configuration.size;
        style_.height = "80%";
    }
    else {
        style_.height = "80%";
        style_.width = configuration.size;
    }

    return <>
        <div
            style={{
                ... style_,
                ... style
            }}/>
    </>;
}