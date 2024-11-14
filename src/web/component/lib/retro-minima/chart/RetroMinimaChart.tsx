import type { ReactNode } from "react";
import type { CSSProperties as Style } from "react";
import { RetroMinimaCandlestick } from "./RetroMinimaCandlestick"; // Adjust the import path

export type RetroMinimaChartPoint = {
    timestamp: bigint;
    open: number;
    close: number;
    wickLow: number;
    wickHigh: number;
};



export type PointSet = {
    count(): bigint;
    min(): number;
    max(): number;
    average(): number;
};
export function PointSet(_points: Array<Point>): PointSet {
    /***/ {
        return {count, min, max, average};
    }

    function count(): bigint {
        return BigInt(_points.length);
    }

    function min(): number {
        let result: number = 0;
        let i: bigint = 0n;
        while (i < _points.length) {
            let point: Point = _points[Number(i)];
            let lowest: number = 0;
            let x: number = point.wickLow;
            let y: number = point.bodyLow;
            if (x < lowest) lowest = x;
            if (y < lowest) lowest = y;
            if (lowest < result) result = lowest;
            i++;
        }
        return result;
    }

    function max(): number {
        let result: number = 0;
        let i: bigint = 0n;
        while (i < _points.length) {
            let point: Point = _points[Number(i)];
            let highest: number = 0;
            let x: number = point.wickHigh;
            let y: number = point.bodyHigh;
            if (x > highest) highest = x;
            if (y > highest) highest = y;
            if (highest > result) result = highest;
            i++;
        }
        return result;
    }

    function average(): number {
        let result: number = 0;
        let i: bigint = 0n;
        while (i < _points.length) {
            let point: Point = _points[Number(i)];
            result += (point.wickLow + point.bodyLow + point.bodyHigh + point.wickHigh) / 4;
            i++;
        }
        return result / _points.length;
    }

    function percentageChange(timestamp0: bigint, timestamp1: bigint)
}






































export function RetroMinimaChart(): JSX.Element {
    const points = [
        [0, 0, 0, 50], // Wick low, body start, body end, wick high
        [3, 8, 10, 2],
        [6, 5, 7, 8],
        [0, 5, 7, 8],
        // Add more points as needed
    ];

    const lowest = () => {
        let lowest = Infinity;
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            for (let ii = 0; ii < 4; ii++) {
                let stat = point[ii];
                if (stat < lowest) {
                    lowest = stat;
                }
            }
        }
        return lowest;
    };

    const highest = () => {
        let highest = -Infinity;
        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            for (let ii = 0; ii < 4; ii++) {
                let stat = point[ii];
                if (stat > highest) {
                    highest = stat;
                }
            }
        }
        return highest;
    };

    const candlestickCount: number = points.length;
    const w = 600;
    const h = 300;
    const tick = h / (highest() - lowest()); // Scale factor based on price range
    const __wrapper: Style = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        width: w,
        height: h
    };
    const __candlestickWrapper: Style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width: w / candlestickCount,
        height: "100%",
        flexGrow: 1,
        position: "relative"
    };

    const candlestickWrappers: ReactNode[] = [];
    for (let i = 0; i < candlestickCount; i++) {
        const [wickLow, bodyStart, bodyEnd, wickHigh] = points[i];

        // Calculate scaled positions for the candlestick based on its price
        const wickLowPosition = h - (wickLow - lowest()) * tick;
        const wickHighPosition = h - (wickHigh - lowest()) * tick;
        const bodyStartPosition = h - (bodyStart - lowest()) * tick;
        const bodyEndPosition = h - (bodyEnd - lowest()) * tick;

        // Calculate the wick heights (the distance between wick low and body start, body end and wick high)
        const topWickHeight = wickHighPosition - bodyStartPosition;
        const bottomWickHeight = bodyEndPosition - wickLowPosition;
        const bodyHeight = Math.abs(bodyStartPosition - bodyEndPosition);

        // Positioning the candlestick correctly based on wickLow, starting from the bottom
        const distanceFromBottom = wickLowPosition;

        candlestickWrappers.push(
            <div style={__candlestickWrapper} key={i}>
                <RetroMinimaCandlestick
                    outlineColor="white"
                    bodyW={5}  // Width of body
                    bodyH={bodyHeight}  // Height of body
                    bodyColor="white"
                    topWickW={1}  // Width of top wick
                    topWickH={topWickHeight}  // Height of top wick
                    bottomWickW={1}  // Width of bottom wick
                    bottomWickH={bottomWickHeight}  // Height of bottom wick
                    wickColor="white"
                    distance={distanceFromBottom}  // The scaled price value for positioning
                />
            </div>
        );
    }

    return (
        <div style={__wrapper}>
            {candlestickWrappers}
        </div>
    );
}



function _low()

function _tick(low: number, high: number, height: number): number {
    return height / (high - low);
}

