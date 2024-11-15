import type {ReactNode} from "react";
import type {Maybe} from "@common/util/base/Maybe";
import {RetroMinimaChartPoint} from "./RetroMinimaChartPoint";
import {assert} from "@common/util/base/Assert";
import {some} from "@common/util/base/Some";

export type RetroMinimaChartProps = {
    points: Array<RetroMinimaChartPoint>;
};

export function RetroMinimaChart(props: RetroMinimaChartProps): ReactNode {
    let {points} = props;


}

/// NOTE Divides the height of the chart to get the units of distance to increase
///      the price from the lowest price to the highest price in terms of
///      pixels. Used to calculate the position of a candlestick on the
///      y axis.
function _tick(height: number, low: number, high: number): number {
    return height / (high - low);
}

function _low(points: ReadonlyArray<RetroMinimaChartPoint>): number {
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
    let point: Maybe<RetroMinimaChartPoint> = points.at(-1);
    assert(some(point), "ERR_POINT_REQUIRED");
    return point!.timestamp;
}

function _latestTimestamp(points: ReadonlyArray<RetroMinimaChartPoint>): bigint {
    assert(some(points), "ERR_POINTS_REQUIRED");
    points = _sort(points);
    let point: Maybe<RetroMinimaChartPoint> = points.at(0);
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