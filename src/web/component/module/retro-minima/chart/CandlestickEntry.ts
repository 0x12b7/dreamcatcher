import {assert} from "@common/util/base/Assert";

export type CandlestickEntryErr =
    | "INPUT_ERR_CANDLESTICK_ENTRY_TIMESTAMP_UNDERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_OPEN_UNDERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_CLOSE_UNDERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_UNDERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_WICK_HIGH_UNDERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_TIMESTAMP_OVERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_OPEN_OVERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_CLOSE_OVERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_OVERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_WICK_HIGH_OVERFLOW"
    | "INPUT_ERR_CANDLESTICK_ENTRY_OPEN_NOT_FINITE"
    | "INPUT_ERR_CANDLESTICK_ENTRY_CLOSE_NOT_FINITE"
    | "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_NOT_FINITE"
    | "INPUT_ERR_CANDLESTICK_ENTRY_WICK_HIGH_NOT_FINITE"
    | "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_VIOLATES_OPEN_CLOSE_RANGE"
    | "INPUT_ERR_CANDLESTICK_ENTRY_WICK_HIGH_VIOLATES_OPEN_CLOSE_RANGE"
    | "INPUT_ERR_CANDLESTICK_ENTRY_OPEN_NOT_IN_WICK_RANGE"
    | "INPUT_ERR_CANDLESTICK_ENTRY_CLOSE_NOT_IN_WICK_RANGE"
    | "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_GREATER_THAN_WICK_HIGH";

export type CandlestickEntry = {
    timestamp: bigint;
    open: number;
    close: number;
    wickLow: number;
    wickHigh: number;
};

export function CandlestickEntry({
    timestamp,
    open,
    close,
    wickLow,
    wickHigh}: {
        timestamp: bigint;
        open: number;
        close: number;
        wickLow: number;
        wickHigh: number;
    }): CandlestickEntry {
    assert<CandlestickEntryErr>(timestamp <= 2n ** 256n, "INPUT_ERR_CANDLESTICK_ENTRY_TIMESTAMP_UNDERFLOW");
    assert<CandlestickEntryErr>(timestamp >= 0n, "INPUT_ERR_CANDLESTICK_ENTRY_TIMESTAMP_UNDERFLOW");
    assert<CandlestickEntryErr>(open >= 0, "INPUT_ERR_CANDLESTICK_ENTRY_OPEN_OVERFLOW");
    assert<CandlestickEntryErr>(close >= 0, "INPUT_ERR_CANDLESTICK_ENTRY_CLOSE_OVERFLOW");
    assert<CandlestickEntryErr>(wickLow >= 0, "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_OVERFLOW");
    assert<CandlestickEntryErr>(wickHigh >= 0, "INPUT_ERR_CANDLESTICK_ENTRY_WICK_HIGH_OVERFLOW");
    assert<CandlestickEntryErr>(open <= Number.MAX_SAFE_INTEGER, "INPUT_ERR_CANDLESTICK_ENTRY_OPEN_OVERFLOW");
    assert<CandlestickEntryErr>(close <= Number.MAX_SAFE_INTEGER, "INPUT_ERR_CANDLESTICK_ENTRY_CLOSE_OVERFLOW");
    assert<CandlestickEntryErr>(wickLow <= Number.MAX_SAFE_INTEGER, "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_OVERFLOW");
    assert<CandlestickEntryErr>(wickHigh <= Number.MAX_SAFE_INTEGER, "INPUT_ERR_CANDLESTICK_ENTRY_WICK_HIGH_OVERFLOW");
    assert<CandlestickEntryErr>(Number.isFinite(open), "INPUT_ERR_CANDLESTICK_ENTRY_OPEN_NOT_FINITE");
    assert<CandlestickEntryErr>(Number.isFinite(close), "INPUT_ERR_CANDLESTICK_ENTRY_CLOSE_NOT_FINITE");
    assert<CandlestickEntryErr>(Number.isFinite(wickLow), "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_NOT_FINITE");
    assert<CandlestickEntryErr>(Number.isFinite(wickHigh), "INPUT_ERR_CANDLESTICK_ENTRY_WICK_HIGH_NOT_FINITE");
    assert<CandlestickEntryErr>(wickLow <= Math.min(open, close), "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_VIOLATES_OPEN_CLOSE_RANGE");
    assert<CandlestickEntryErr>(wickHigh >= Math.max(open, close), "INPUT_ERR_CANDLESTICK_ENTRY_WICK_HIGH_VIOLATES_OPEN_CLOSE_RANGE");
    assert<CandlestickEntryErr>(open >= wickLow && open <= wickHigh, "INPUT_ERR_CANDLESTICK_ENTRY_OPEN_NOT_IN_WICK_RANGE");
    assert<CandlestickEntryErr>(close >= wickLow && close <= wickHigh, "INPUT_ERR_CANDLESTICK_ENTRY_CLOSE_NOT_IN_WICK_RANGE");
    assert<CandlestickEntryErr>(wickLow <= wickHigh, "INPUT_ERR_CANDLESTICK_ENTRY_WICK_LOW_GREATER_THAN_WICK_HIGH");
    return ({timestamp, open, close, wickLow, wickHigh});
}