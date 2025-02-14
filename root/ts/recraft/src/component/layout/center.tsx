import {
    type ReactNode,
    type ComponentPropsWithRef
} from "react";

export function Center(props: Center.Props): ReactNode {
    let { style, children, ...more } = props;
    
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                ...style
            }}
            { ...more }>
            { children }
        </div>
    </>;
}

export namespace Center {
    export type Props =
        & ComponentPropsWithRef<"div">;
}