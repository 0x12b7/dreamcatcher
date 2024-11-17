import type {ReactNode} from "react";
import type {Maybe} from "@common/util/base/Maybe";
import type {CSSProperties as Style} from "react";
import type {ComponentPropsWithRef as ReactProps} from "react";
import {RetroMinimaCandlestick} from "./RetroMinimaCandlestick";
import {RetroMinimaChartPoint} from "./RetroMinimaChartPoint";
import {assert} from "@common/util/base/Assert";
import {some} from "@common/util/base/Some";
import {useState} from "react";
import {useEffect} from "react";
import * as ColorPalette from "../../../../style/ColorPalette";

export type RetroMinimaChartProps = 
    & ReactProps<"div">
    & {
    w: number;
    h: number;
    points: Array<RetroMinimaChartPoint>;
};

export function RetroMinimaChart(props: RetroMinimaChartProps): ReactNode {
    let {w, h, points, style, children, ... more} = props;
    let [slots, setSlots] = useState<Array<ReactNode>>([]);
    let container$: Style = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignItems: "center",
        width: w,
        height: h,
        ... style
    } as const;
    
    useEffect(() => {
        let bullishColor: string = ColorPalette.SPRING_GREEN;
        let bearishColor: string = ColorPalette.BITTER_SWEET;
        let oldestTimestamp: bigint = _oldestTimestamp(points);
        let latestTimestamp: bigint = _latestTimestamp(points);
        let data: Array<RetroMinimaChartPoint> = [];
        let timestamp: bigint = oldestTimestamp;
        while (timestamp <= latestTimestamp) {
            data.push(_lookup(points, timestamp));
            timestamp++;
        }
        let min: number = _low(data);
        let max: number = _high(data);
        let tick: number = _tick(h, min, max);
        let slot$: Style = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            height: "100%"
        } as const;
        let space: number = 0;
        let slots = data.map((point, key) => {
            let bullish: boolean = point.close > point.open;
            let bearish: boolean = point.close < point.open;
            let idle: boolean = point.close === point.open;
            let color: string = bullish ? bullishColor : bearishColor;
            let wickW: number = 10;
            let bodyDiff: number = bullish ? point.close - point.open : point.open - point.close;
            let bodyW: number = 20;
            let bodyH: number = bodyDiff * tick;
            let topWickDiff: number = bullish ? point.wickHigh - point.close : point.wickHigh - point.open;
            let topWickW: number = wickW;
            let topWickH: number = topWickDiff * tick;
            let bottomWickDiff: number = bullish ? point.open - point.wickLow : point.close - point.wickLow;
            let bottomWickW: number = wickW;
            let bottomWickH: number = bottomWickDiff * tick;
            let distance: number = point.wickLow * tick;
            return <>
                <div key={key} style={slot$}>
                    <RetroMinimaCandlestick 
                        outlineColor={color} 
                        bodyW={bodyW} 
                        bodyH={bodyH} 
                        bodyColor={color} 
                        topWickW={topWickW} 
                        topWickH={topWickH} 
                        bottomWickW={bottomWickW} 
                        bottomWickH={bottomWickH} 
                        wickColor={color} 
                        distance={distance} 
                        space={space += 25}/>
                </div>
            </>
        });
        setSlots(slots);
    }, [points, w, h]);

    return <>
        <div style={container$} {... more}>
            {... slots}
        </div>
    </>;
}

/// NOTE Divides the height of the chart to get the units of distance to increase
///      the price from the lowest price to the highest price in terms of
///      pixels. Used to calculate the position of a candlestick on the
///      y axis.
function _tick(height: number, low: number, high: number): number {
    return height / (high - low);
}

function _low(points: ReadonlyArray<RetroMinimaChartPoint>, timestamp0: bigint, timestamp1: bigint): number;
function _low(points: ReadonlyArray<RetroMinimaChartPoint>): number;
function _low(points: ReadonlyArray<RetroMinimaChartPoint>, timestamp0?: bigint, timestamp1?: bigint): number {
    /// TODO Implement ranged low lookup

    let result: number = _high(points);
    let i: bigint = 0n;
    while (i < points.length) {
        let point: RetroMinimaChartPoint = points[Number(i)];
        if (point.wickLow < result) result = point.wickLow;
        i++;
    }
    return result;
}

function _high(points: ReadonlyArray<RetroMinimaChartPoint>): number {
    let result: number = 0;
    let i: bigint = 0n;
    while (i < points.length) {
        let point: RetroMinimaChartPoint = points[Number(i)];
        if (point.wickHigh > result) result = point.wickHigh;
        i++;
    }
    return result;
}

/// NOTE Will look up a point based on timestamp and if it cannot find it will
///      return the price of the first leading candlestick. ie. the last known
///      closing candlestick was at $50, then it is assumed the price is still
///      as $50. If there are no leading candlesticks then the price is assumed
///      to be at $0.
function _lookup(points: ReadonlyArray<RetroMinimaChartPoint>, timestamp: bigint): RetroMinimaChartPoint {
    points = _sort(points);
    let nearestLeadingPoint: Maybe<RetroMinimaChartPoint> = null;
    let zero: RetroMinimaChartPoint = 
        RetroMinimaChartPoint({
            timestamp: timestamp,
            open: 0,
            close: 0,
            wickHigh: 0,
            wickLow: 0        
        });
    let i: bigint = 0n;
    while (i < points.length) {
        let point: RetroMinimaChartPoint = points[Number(i)];
        if (point.timestamp === timestamp) return point;
        if (point.timestamp > timestamp) {
            if (!nearestLeadingPoint) return zero;
            let lastKnownClose: number = nearestLeadingPoint.close;
            return RetroMinimaChartPoint({
                timestamp: timestamp,
                open: lastKnownClose,
                close: lastKnownClose,
                wickHigh: lastKnownClose,
                wickLow: lastKnownClose
            });
        }
        nearestLeadingPoint = point;
        i++;
    }
    return zero;
}

function _oldestTimestamp(points: ReadonlyArray<RetroMinimaChartPoint>): bigint {
    assert(some(points), "ERR_POINTS_REQUIRED");
    points = _sort(points);
    let point: Maybe<RetroMinimaChartPoint> = points.at(0);
    assert(some(point), "ERR_POINT_REQUIRED");
    return point!.timestamp;
}

function _latestTimestamp(points: ReadonlyArray<RetroMinimaChartPoint>): bigint {
    assert(some(points), "ERR_POINTS_REQUIRED");
    points = _sort(points);
    let point: Maybe<RetroMinimaChartPoint> = points.at(-1);
    assert(some(point), "ERR_POINT_REQUIRED");
    return point!.timestamp;
}

function _sort(points: ReadonlyArray<RetroMinimaChartPoint>): Array<RetroMinimaChartPoint> {
    return points
        .slice()
        .sort((x, y) => {
            if (x.timestamp < y.timestamp) return -1;
            if (x.timestamp > y.timestamp) return 1;
            return 0;
        });
}