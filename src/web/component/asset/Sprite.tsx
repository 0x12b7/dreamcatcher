import type {ReactNode} from "react";
import type {CSSProperties as Style} from "react";
import type {ComponentPropsWithRef as ReactComponentPropsWithRef} from "react";

export function Sprite({
    url,
    style,
    children,
    ... more}:
        & ReactComponentPropsWithRef<"div">
        & {
        url: string; 
    }): ReactNode {
    let __style: Style = {
        backgroundImage: `url(${url})`,
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        ... style
    } as const;
    
    return <>
        <div style={__style} {... more}>
            {children}
        </div>
    </>;
}