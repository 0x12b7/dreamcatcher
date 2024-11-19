import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react-spring";
import {toArray} from "@seal";
import {rho} from "@style/unit/Rho";
import * as ColorPalette from "@style/ColorPalette";

export type TableItemProps = 
    & Omit<ComponentPropsWithRef<"div">, "children">
    & {
    children: ReadonlyArray<ReactNode> | ReactNode;
}
export function TableItem(props: TableItemProps): ReactNode {
    let {style, children, ... more} = props;
    
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                flexGrow: 1,
                ... style
            }}
            {... more}>
            {toArray(children).map(child =>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    flexGrow: 1,
                    fontSize: rho(2n),
                    fontWeight: "normal",
                    fontFamily: "departure-mono",
                    color: ColorPalette.TIMPERWOLD
                }}>
                {child}
            </div>)}
        </div>
    </>;
}