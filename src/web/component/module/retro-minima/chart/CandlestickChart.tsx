import type {ReactNode} from "react";
import type {CSSProperties as Style} from "react";
import type {ComponentPropsWithRef} from "react";
import {CandlestickChartPoint} from "@retro-minima";
import type {Maybe} from "@common/util/base/Maybe";
import {Candlestick} from "@retro-minima";
import {useEffect} from "react";
import {useState} from "react";
import {assert} from "@common/util/base/Assert";
import {some} from "@common/util/base/Some";
import * as ColorPalette from "../../../../style/ColorPalette";

export type CandlestickChartProps =
    & ComponentPropsWithRef<"div">
    & {
    w: number;
    h: number;
    data: Array<CandlestickChartPoint>;
    timestamp0: bigint;
    timestamp1: bigint;
    seconds: bigint;
};

export function CandlestickChart(props: CandlestickChartProps): ReactNode {
    let {w, h, data, timestamp0, timestamp1, seconds, style, children, ... more} = props;

    useEffect(() => {
        let bullishColor: string = ColorPalette.SPRING_GREEN;
        let bearishColor: string = ColorPalette.BITTER_SWEET;
        let noColor: string = ColorPalette.TIMPERWOLD;
        data = _merge(data, seconds, timestamp0, timestamp1);



    }, []);
    
    return <>

    </>;
}

function _yTick(height: number, min: number, max: number): number {
    assert(height > 0, "height-is-less-than-zero");
    assert(min >= 0, "min-is-negative");
    assert(max >= 0, "max-is-negative");
    assert(max - min > 0, "division-by-zero");
    let result: number = height / (max - min);
    assert(result >= 0, "result-is-negative");
    return result;
}

function _min(data: ReadonlyArray<CandlestickChartPoint>): number {
    let result: number = _max(data);
    let i: bigint = 0n;
    while (i < data.length) {
        let point: CandlestickChartPoint = data[Number(i)];
        if (point.wickLow < result) result = point.wickLow;
        i++;
    }
    return result;
}

function _max(data: ReadonlyArray<CandlestickChartPoint>): number {
    let result: number = 0;
    let i: bigint = 0n;
    while (i < data.length) {
        let point: CandlestickChartPoint = data[Number(i)];
        if (point.wickHigh > result) result = point.wickHigh;
        i++;
    }
    return result;
}

function _lookup(data: ReadonlyArray<CandlestickChartPoint>, timestamp: bigint): CandlestickChartPoint {
    assert(some(data), "data-required");
    data = _sort(data);
    let nearestLeadingPoint: Maybe<CandlestickChartPoint> = null;
    let zero: CandlestickChartPoint = CandlestickChartPoint({
        timestamp: timestamp,
        open: 0,
        close: 0,
        wickHigh: 0,
        wickLow: 0
    });
    let i: bigint = 0n;
    while (i < data.length) {
        let point: CandlestickChartPoint = data[Number(i)];
        if (point.timestamp === timestamp) return point;
        if (point.timestamp > timestamp) {
            if (!nearestLeadingPoint) return zero;
            let lastKnownClose: number = nearestLeadingPoint.close;
            return CandlestickChartPoint({
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

function _sort(data: ReadonlyArray<CandlestickChartPoint>): Array<CandlestickChartPoint> {
    assert(some(data), "data-required");
    return data
        .slice()
        .sort((x, y) => x.timestamp < y.timestamp ? -1 : x.timestamp > y.timestamp ? 1 : 0);
}

function _merge(data: ReadonlyArray<CandlestickChartPoint>, seconds: bigint, fromTimestamp: bigint, toTimestamp: bigint): Array<CandlestickChartPoint> {
    assert(some(data), "data-required");
    assert(seconds >= 1n, "seconds-must-be-at-least-1");
    assert(fromTimestamp >= 0n, "timestamp-0-is-negative");
    assert(toTimestamp >= 0n, "INPUT_ERR_TO_TIMESTAMP_IS_NEGATIVE");
    assert(toTimestamp > fromTimestamp, "INPUT_ERR_LATEST_TIMESTAMP_CANNOT_BE_BEFORE_THE_OLDEST_TIMESTAMP");
    let result: Array<CandlestickChartPoint> = [];
    _pack(_populate(data, fromTimestamp, toTimestamp), seconds).forEach(chunk => {
        assert(some(chunk), "CRIT_ERR_CHUNK_REQUIRED");
        if (chunk.length >= 2) 
            return result.push(CandlestickChartPoint({
                wickHigh: _max(chunk),
                wickLow: _min(chunk),
                open: chunk[0].open,
                close: chunk[chunk.length - 1].close,
                timestamp: chunk[0].timestamp
            }));
        return result.push(chunk[0]);
    });
    assert(some(result), "CRIT_ERR_RESULTING_ARRAY_IS_EMPTY");
    return result;
}

function _populate(data: ReadonlyArray<CandlestickChartPoint>, fromTimestamp: bigint, toTimestamp: bigint): Array<CandlestickChartPoint> {
    assert(some(data), "INPUT_ERR_DATA_REQUIRED");
    assert(fromTimestamp >= 0n, "INPUT_ERR_FROM_TIMESTAMP_IS_NEGATIVE");
    assert(toTimestamp >= 0n, "INPUT_ERR_TO_TIMESTAMP_IS_NEGATIVE");
    assert(toTimestamp > fromTimestamp, "INPUT_ERR_LATEST_TIMESTAMP_CANNOT_BE_BEFORE_THE_OLDEST_TIMESTAMP");
    let result: Array<CandlestickChartPoint> = [];
    let timestamp: bigint = fromTimestamp;
    while (timestamp <= toTimestamp) {
        result.push(_lookup(data, timestamp));
        timestamp++;
    }
    assert(result.length === Number(toTimestamp - fromTimestamp), "CRIT_ERR_UNEXPECTED_RESULT_ARRAY_LENGTH");
    return result;
}

function _oldestTimestamp(data: ReadonlyArray<CandlestickChartPoint>): bigint {
    assert(some(data), "INPUT_ERR_DATA_REQUIRED");
    return _sort(data).at(0)!.timestamp;
}

function _latestTimestamp(data: ReadonlyArray<CandlestickChartPoint>): bigint {
    assert(some(data), "INPUT_ERR_DATA_REQUIRED");
    return _sort(data).at(-1)!.timestamp;
}

function _pack<T>(array: ReadonlyArray<T>, count: bigint): Array<Array<T>> {
    assert(some(array), "INPUT_ERR_ARRAY_CANNOT_BE_EMPTY");
    assert(count >= 1n, "INPUT_ERR_COUNT_MUST_BE_AT_LEAST_1");
    let result: Array<Array<T>> = [];
    let i: bigint = 0n;
    while (i < array.length) {
        result.push(array.slice(Number(i), Number(i + count)));
        i += count;
    }
    assert(result.length > 0, "CRIT_ERR_RESULTING_ARRAY_IS_EMPTY");
    assert(result.flat().length === array.length, "CRIT_ERR_RESULTING_CHUNKS_DO_NOT_MATCH_ORIGINAL_ARRAY_LENGTH");
    assert(result[result.length - 1].length > 0, "CRIT_ERR_LAST_CHUNK_INVALID");
    assert(result[result.length - 1].length <= Number(count), "CRIT_ERR_LAST_CHUNK_INVALID");
    return result;
}


export function CandlestickEntrySet() {
    
}



abstract class EntryI {
    public abstract timestamp: bigint;
    public abstract open: number;
    public abstract close: number;
    public abstract wickLow: number;
    public abstract wickHigh: number;
}

class Entry implements EntryI {
    public constructor(
        public timestamp: bigint,
        public open: number,
        public close: number,
        public wickLow: number,
        public wickHigh: number) {
        assert(timestamp >= 0n);
        assert(open >= 0);
        assert(close >= 0);
        assert(wickLow >= 0);
        assert(wickHigh >= 0);
        assert(open > close ? wickLow < close : wickLow < open);
        assert(open > close ? wickHigh > open : wickHigh > close);
        
    }
}

class EntrySet {
    public constructor(private readonly _entries: Array<EntryI>) {
        assert(some(this._entries));
        this._entries = this._entries      
            .slice()
            .sort((x, y) => x.timestamp < y.timestamp ? -1 : x.timestamp > y.timestamp ? 1 : 0);
    }

    public oldestTimestamp(): bigint {
        return this._entries.at(0)?.timestamp ?? 0n;
    }

    public latestTimestamp(): bigint {
        return this._entries.at(-1)?.timestamp ?? BigInt(new Date().getTime());
    }
}
 
new EntrySet([
    new Entry(10n, 5, 6, 4, 6),
    new Entry(20n, 7, 5, 2, 6)
]);

