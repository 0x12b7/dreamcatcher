import type {Maybe} from "@common/util/base/Maybe";
import {CandlestickEntry} from "./CandlestickEntry";
import {assert} from "@common/util/base/Assert";
import {some} from "@common/util/base/Some";
import {none} from "@common/util/base/None";

export function CandlestickEntrySet(_set: Array<CandlestickEntry>, _startTimestamp: bigint, _endTimestamp: bigint) {
    return (() => {
        assert(some(_set));
        assert(_startTimestamp >= 0n);
        assert(_endTimestamp >= 0n);
        assert(_startTimestamp < (2n ** 256n));
        assert(_endTimestamp < (2n ** 256n));
        _sort();
        _fill();
        _sort();
        _parse();
        _sort();

        return ({
            generate,
            lookup,
            oldestTimestamp,
            latestTimestamp
        });
    })();

    function generate(ms: bigint) {
        let result: Array<CandlestickEntry> = [];
        _chunks(ms).forEach(chunk => {
            assert(some(chunk));
            if (chunk.length >= 2) return result.push(CandlestickEntry({
                timestamp: chunk[0].timestamp,
                open: chunk[0].open,
                close: chunk[chunk.length - 1].close,
                wickLow: _min(),
                wickHigh: _max()
            }));
            return result.push(chunk[0]);
        });
        assert(some(result));
        return result;
    }

    function lookup(timestamp: bigint): Maybe<Readonly<CandlestickEntry>> {
        let i: bigint = 0n;
        while (i < _set.length) {
            let entry: CandlestickEntry = _set[Number(i)];
            if (entry.timestamp === timestamp) return entry;
            i++;
        }
        return undefined;
    }

    function oldestTimestamp(): bigint {
        return _set[0].timestamp;
    }

    function latestTimestamp(): bigint {
        return _set[_set.length - 1].timestamp;
    }

    function _min(): number {
        let result: number = _max();
        let i: bigint = 0n;
        while (i < _set.length) {
            let point: CandlestickEntry = _set[Number(i)];
            if (point.wickLow < result) result = point.wickLow;
            i++;
        }
        return result;
    }

    function _max(): number {
        let result: number = 0;
        let i: bigint = 0n;
        while (i < _set.length) {
            let point: CandlestickEntry = _set[Number(i)];
            if (point.wickHigh > result) result = point.wickHigh;
            i++;
        }
        return result;
    }
 
    function _parse(): void {
        let result: Array<CandlestickEntry> = [];
        let timestamp: bigint = _startTimestamp;
        while (timestamp <= _endTimestamp) {
            console.log("generating " + timestamp);
            let entry: CandlestickEntry = _set[Number(timestamp)];
            let empty: boolean = entry.close === 0
                && entry.open === 0
                && entry.wickLow === 0
                && entry.wickHigh === 0;
            let last: Maybe<number> = _last(timestamp);
            if (!empty) result.push(entry);
            else result.push(CandlestickEntry({
                timestamp: timestamp,
                open: last!,
                close: last!,
                wickLow: last!,
                wickHigh: last!
            }));
            timestamp++;
        }
        _set = result;
        return;
    }

    function _last(fromTimestamp: bigint): number {
        let timestamp: bigint = fromTimestamp;
        while (timestamp >= 0) {
            let entry: Maybe<CandlestickEntry> = lookup(timestamp);
            if (some(entry) && entry!.close !== 0) return entry!.close;
            timestamp --;
        }
        return 0;
    }

    function _fill(): void {
        let result: Array<CandlestickEntry> = [];
        let timestamp: bigint = _startTimestamp;
        while (timestamp <= _endTimestamp) {
            result.push(lookup(timestamp) ?? _zero(timestamp));
            timestamp++;
        }
        _set = result;
        return;
    }

    function _sort(): void {
        _set = _set
            .slice()
            .sort((x, y) => x.timestamp < y.timestamp ? -1 : x.timestamp > y.timestamp ? 1 : 0);
    }

    function _zero(timestamp: bigint): CandlestickEntry {
        return CandlestickEntry({
            timestamp: timestamp,
            open: 0,
            close: 0,
            wickLow: 0,
            wickHigh: 0
        });
    }

    function _chunks(count: bigint): Array<Array<CandlestickEntry>> {
        assert(count >= 1n);
        let result: Array<Array<CandlestickEntry>> = [];
        let i: bigint = 0n;
        while (i < _set.length) {
            result.push(_set.slice(Number(i), Number(i + count)));
            i += count;
        }
        assert(result.length > 0);
        assert(result.flat().length === _set.length);
        assert(result[result.length - 1].length > 0);
        assert(result[result.length - 1].length <= Number(count));
        return result;
    }
}

let set = CandlestickEntrySet([
    CandlestickEntry({
        timestamp: 5n,
        open: 24,
        close: 54,
        wickLow: 10,
        wickHigh: 80
    })
], 0n, 1731856895n);

console.log(set.generate(100n));