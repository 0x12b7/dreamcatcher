import {
    type ReactNode,
    useState,
    useEffect
} from "react";

export function Slider(props: Slider.Props): ReactNode {
    let [cursor, setCursor] = useState<bigint>(0n);

    return <>
        <div
            style={{
                
            }}>

        </div>
    </>;
}

export namespace Slider {
    export type Props = {};
}