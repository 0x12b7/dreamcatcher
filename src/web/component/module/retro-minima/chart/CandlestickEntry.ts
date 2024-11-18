import {assert} from "@seal";

export type CandlestickEntry = {
    timestamp: bigint;
    min: number;
    max: number;
    open: number;
    close: number;
};

export function CandlestickEntry({timestamp, min, max, open, close}: CandlestickEntry): CandlestickEntry {
    assert(timestamp >= 0n);
    assert(min >= 0);
    assert(max >= 0);
    assert(open >= 0);
    assert(close >= 0);
    assert(max > min);
    assert(max >= Math.max(open, close));
    assert(min <= Math.min(open, close));
    return {timestamp, min, max, open, close};
}