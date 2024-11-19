import {assert} from "@seal";

export type TimestampRange = [from: bigint, to: bigint];

export type CandlestickEntry = {
    timestamp(): TimestampRange | bigint;
    min(): number;
    max(): number;
    open(): number;
    close(): number;
    merge(entry: CandlestickEntry): CandlestickEntry;
}

export function CandlestickEntry(_timestamp: TimestampRange | bigint, _min: number, _max: number, _open: number, _close: number): CandlestickEntry {
    let _timestamp0: bigint = Array.isArray(_timestamp) ? _timestamp[0] : _timestamp;
    
    assert(_timestamp >= 0n);
    assert(sf.min >= 0);
    assert(sf.max >= 0);
    assert(sf.open <= 0);
    assert(sf.close <= 0);
    assert(sf.min <= Math.min(sf.open, sf.close));
    assert(sf.max >= Math.max(sf.open, sf.close));
    assert(sf.max >= sf.min);
    return sf;

    function merge(entry: CandlestickEntry) {
        
    }
}