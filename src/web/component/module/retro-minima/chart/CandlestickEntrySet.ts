import type {Maybe} from "@common/util/base/Maybe";
import {CandlestickEntry} from "./CandlestickEntry";
import {assert} from "@common/util/base/Assert";
import {some} from "@common/util/base/Some";
import {none} from "@common/util/base/None";

export function CandlestickEntrySet(_entries: Array<CandlestickEntry>, _timestamp0: bigint, _timestamp1: bigint) {
    /***/ {
        assert(some(_entries));
        assert(_timestamp0 >= 0n);
        assert(_timestamp1 >= 0n);
        assert(_timestamp1 > _timestamp0);
        _sort();
        _fill();
        _sort();
        _replace();
        _sort();
    
        return ({});
    }

    function lookup(timestamp: bigint): Maybe<Readonly<CandlestickEntry>> {
        let i: bigint = 0n;
        while (i < _entries.length) {
            if (_entries[Number(i)].timestamp === timestamp) return _entries[Number(i)];
            i++;
        }
        return undefined;
    }

    function _replace(): void {
        let result: Array<CandlestickEntry> = [];
        let timestamp: bigint = _timestamp0;
        while (timestamp <= _timestamp1) {
            let entry: CandlestickEntry = _entries[Number(timestamp)];
            let empty: boolean = entry.close === 0
                && entry.open === 0
                && entry.wickLow === 0
                && entry.wickHigh === 0;
            if (empty) {
                let last = _last(timestamp);
                if (last) {
                    result.push(CandlestickEntry({
                        _timestamp: timestamp,
                        _open: last,
                        _close: last,
                        _wickLow: last,
                        _wickHigh: last
                    }));
                }
            }
            else {
                result.push(entry);
            }
            timestamp++;
        }
        _entries = result;
        return;
    }

    function _last(timestamp: bigint): number {
        let i: bigint = timestamp;
        while (i >= 0) {
            let entry: Maybe<CandlestickEntry> = lookup(i);
            if (some(entry) && entry!.close !== 0) return entry!.close;
            i--;
        }
        return 0;
    }

    function _fill(): void {
        let result: Array<CandlestickEntry> = [];
        let timestamp: bigint = _timestamp0;
        while (timestamp <= _timestamp1) {
            result.push(lookup(timestamp) ?? _zero(timestamp));
            timestamp++;
        }
        _entries = result;
        return;
    }

    function _zero(timestamp: bigint): CandlestickEntry {
        return CandlestickEntry({
            _timestamp: timestamp,
            _open: 0,
            _close: 0,
            _wickLow: 0,
            _wickHigh: 0
        });
    }

    function _sort(): void {
        _entries = _entries
            .slice()
            .sort((x, y) => x.timestamp < y.timestamp ? -1 : x.timestamp > y.timestamp ? 1 : 0);
    }

    /// 5 packages 5 candles of 1 ms each, meaning each chunck represents 5ms now.
    /// useful for calculating hourly or custom timeframe candlesticks.
    function _chunks(count: bigint): Array<Array<CandlestickEntry>> {

    }
}




let set = CandlestickEntrySet([
    CandlestickEntry({
        _timestamp: 0n,
        _open: 2,
        _close: 5,
        _wickLow: 3,
        _wickHigh: 8
    }),
    CandlestickEntry({
        _timestamp: 4n,
        _open: 4,
        _close: 3,
        _wickLow: 0,
        _wickHigh: 10
    })
], 0n, 10n);