import type {ReactNode} from "react";
import type {ComponentPropsWithRef} from "react-spring";
import {toArray} from "@seal";

export type TableProps =
    & Omit<ComponentPropsWithRef<"div">, "children">
    & {
    children: ReadonlyArray<ReactNode> | ReactNode;
};
export function Table(props: TableProps): ReactNode {
    let {style, children, ... more} = props;
    
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                padding: 10,
                ... style
            }}
            {... more}>
            {toArray(children).slice(1).map(child =>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    flexGrow: 1
                }}>
                {child}
            </div>)}
        </div>
    </>;
}

