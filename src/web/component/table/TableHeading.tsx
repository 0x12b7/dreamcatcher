import type {ReactNode} from "react";
import type {TableItemProps} from "./TableItem";
import {TableItem} from "./TableItem";
import {rho} from "@style/unit/Rho";
import {toArray} from "@seal";
import * as ColorPalette from "@style/ColorPalette";

export type TableHeadingProps =
    & TableItemProps
    & {};
export function TableHeading(props: TableHeadingProps): ReactNode {
    let {style, children, ... more} = props;

    return <>
        <TableItem
            style={{
                gap: 10,
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
                    background: ColorPalette.TIMPERWOLD,
                    color: ColorPalette.EEIRE_BLACK,
                    fontSize: rho(2n),
                    fontWeight: "normal",
                    fontFamily: "departure-mono",
                    paddingLeft: 5,
                    paddingRight: 5,
                    width: "100%",
                    flexGrow: 1
                }}>
                {child}
            </div>)}
        </TableItem>
    </>;
}