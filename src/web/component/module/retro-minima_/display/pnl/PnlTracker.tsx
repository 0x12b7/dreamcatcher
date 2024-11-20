import type {ReactNode} from "react";
import type {AnimationProps} from "@silk";
import {PnlCounter} from "./PnlCounter";

export type PnlTrackerProps =
    & AnimationProps
    & {};
export function PnlTracker(props: PnlTrackerProps): ReactNode {
    let {animation} = props;
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
            }}>
            <PnlCounter
                label="24HR"
                count={7.34}
                animation={animation}/>
            <PnlCounter
                label="WEEK"
                count={27.37}
                animation={animation}/>
            <PnlCounter
                label="30DY"
                count={-23.58}
                animation={animation}/>
            <PnlCounter
                label="YEAR"
                count={-64.33}
                animation={animation}/>
        </div>
    </>;
}