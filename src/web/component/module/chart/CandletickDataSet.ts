import type {Maybe} from "@seal";
import {CandlestickData} from "@chrt";
import {Option} from "@seal";
import {Result} from "@seal";
import {Ok} from "@seal";
import {Err} from "@seal";
import {Some} from "@seal";
import {None} from "@seal";

export type CandlestickDataSetR = Result<CandlestickDataSetT, CandlestickDataSetE>;
export type CandlestickDataSetT = CandlestickDataSet;
export type CandlestickDataSetE =
    | "ERR_SET_IS_EMPTY"
    | "ERR_SET_DUPLICATE_TIMESTAMP";
export type CandlestickDataSet = {
    range(): [min: number, max: number];
    lookup(timestamp: bigint): CandlestickData;
};
export function CandlestickDataSet(_set: Array<CandlestickData>): CandlestickDataSetR {
    /***/ {
        if (_set.length === 0) return Err("ERR_SET_IS_EMPTY");
        if (_hasDuplicate(_set)) return Err("ERR_SET_DUPLICATE_TIMESTAMP");
        _set.sort((x, y) => x.timestamp < y.timestamp ? -1 : x.timestamp > y.timestamp ? 1 : 0);
        
        return Ok({range, lookup});
    }

    function range(): [min: number, max: number] {
        let min: number = 0;
        let max: number = 0;
        let i: bigint = 0n;
        while (i < _set.length) {
            let data: CandlestickData = _set[Number(i)];
            if (data.min < min) min = data.min;
            if (data.max > max) max = data.max;
            i++;
        }
        return [min, max];
    }

    function lookup(timestamp: bigint): CandlestickData {
        let match: Option<CandlestickData> = None;
        let i: number = 0;
        while (i < _set.length) {
            let data: CandlestickData = _set[i];
            if (data.timestamp === timestamp) match = Some(data);
            i++;
        }
        if (match.some) return match.unwrap();
        
        let nearestLeadingClose: number = 0;
        
        while ()

        
        
        return _nearestLeading(timestamp)
            .andThen(data => Some(_entryAt(timestamp, data.close)))
            .unwrapOr(_entryAt(timestamp));
    }

    function _nearestLeading(timestamp: bigint): Option<CandlestickData> {
        let i: number = 0;
        while (i < _set.length) {
            let curr = _set[i];
            let next = _set[i + 1];
            if (curr.timestamp === timestamp && curr.close !== 0) return Some(curr);
            if (next && timestamp >= curr.timestamp && timestamp <= next.timestamp) return Some(curr);
            if (next === undefined && timestamp >= curr.timestamp) return Some(curr);
            i++;
        }
        return None;
    }

    function _fill(map: Map<bigint, CandlestickData>, fromTimestamp: bigint, toTimestamp: bigint): Array<CandlestickData> {
        /// fill a map from a certain timestamp to another,
        /// where certain points have no dat it will
        /// look back to the last close and assume gnerate
        /// the next candles.
        ///
        /// 24 hr > 5,000,000 entries which can take of a large
        /// amount of space. maybe we look into lazy loading and
        /// calculating these values just in time?
        /// 
        /// pre computed entries are faster to lookup later because
        /// they do not have to be computed on the spot, but can lead to 
        /// large memory usage if the timestamps are too large.
        let result: Map<bigint, CandlestickData> = new Map();
        let timestamp: bigint = fromTimestamp;
        while (timestamp <= toTimestamp) {
            let data: Maybe<CandlestickData> = map.get(timestamp);
            if (data) result.set(timestamp, data);

            timestamp++;
        }
    }

    function _sort(data: ReadonlyArray<CandlestickData>): Array<CandlestickData> {
        return data
            .slice()
            .sort((x, y) => x.timestamp < y.timestamp ? -1 : x.timestamp > y.timestamp ? 1 : 0);
    }

    function _entryAt(timestamp: bigint): CandlestickData;
    function _entryAt(timestamp: bigint, close: number): CandlestickData;
    function _entryAt(timestamp: bigint, close?: number): CandlestickData {
        if (close) {
            return CandlestickData({
                timestamp: timestamp,
                min: close,
                max: close,
                open: close,
                close: close
            }).unwrap();
        }
        return CandlestickData({
            timestamp: timestamp,
            min: 0,
            max: 0,
            open: 0,
            close: 0
        }).unwrap();
    }

    function _hasDuplicate(data: ReadonlyArray<CandlestickData>): boolean {
        let timestamps: Array<bigint> = [];
        let i: bigint = 0n;
        while (i < data.length) {
            let item: CandlestickData = data[Number(i)];
            if (timestamps.includes(item.timestamp)) return true;
            timestamps.push(item.timestamp);
            i++;
        }
        return false;
    }
}

let set = CandlestickDataSet([
    CandlestickData({
        timestamp: 2n,
        min: 50,
        max: 70,
        open: 65,
        close: 60
    }).unwrap(),
    CandlestickData({
        timestamp: 0n,
        min: 20,
        max: 60,
        open: 60,
        close: 20
    }).unwrap()
]);

console.log(
    set.unwrap().range(),
    set.unwrap().lookup(0n),
    set.unwrap().lookup(1n),
    set.unwrap().lookup(2n),
    set.unwrap().lookup(3n),
    set.unwrap().lookup(10n)
);