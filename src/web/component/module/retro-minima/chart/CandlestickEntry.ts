import {assert} from "@common/util/base/Assert";

export type CandlestickEntry = {
    timestamp: bigint;
    open: number;
    close: number;
    wickLow: number;
    wickHigh: number;
};

export function CandlestickEntry({
    _timestamp,
    _open,
    _close,
    _wickLow,
    _wickHigh}: {
        _timestamp?: bigint;
        _open: number;
        _close: number;
        _wickLow?: number;
        _wickHigh?: number;
    }): CandlestickEntry {
    assert(_open >= 0);
    assert(_close >= 0);
    let bullish: boolean = _open > _close;
    _wickLow ??= bullish ? _open : _close;
    _wickHigh ??= bullish ? _close : _close;
    _timestamp ??= 0n;
    assert(_timestamp >= 0n);
    assert(_wickLow >= 0);
    assert(_wickHigh >= 0);
    assert(_wickLow <= _wickHigh);
    assert(_wickLow <= (bullish ? _open : _close));
    assert(_wickHigh >= (bullish ? _close : _open));
    return ({
        timestamp: _timestamp,
        open: _open,
        close: _close,
        wickLow: _wickLow,
        wickHigh: _wickHigh
    });
}