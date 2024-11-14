import type {ReactNode} from "react";
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
    return <>
        <div
            style={{
                backgroundImage: `url(${url})`,
                backgroundPositionX: "center",
                backgroundPositionY: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                ... style
            }}
            {... more}>
            {children}
        </div>
    </>;
}