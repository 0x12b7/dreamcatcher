import {Ok} from "@seal";
import {Err} from "@seal";
import {Result} from "@seal";

export type CandlestickDataLike = CandlestickDataR | CandlestickData;
export type CandlestickDataR = Result<CandlestickDataT, CandlestickDataE>;
export type CandlestickDataT = CandlestickData;
export type CandlestickDataE = 
    | "INPUT_ERR_TIMESTAMP_V_UNDERFLOW"
    | "INPUT_ERR_MIN_V_UNDERFLOW"
    | "INPUT_ERR_MAX_V_UNDERFLOW"
    | "INPUT_ERR_OPEN_V_UNDERFLOW"
    | "INPUT_ERR_CLOSE_V_UNDERFLOW"
    | "INPUT_ERR_MIN_V_OVERFLOW"
    | "INPUT_ERR_MAX_V_OVERFLOW"
    | "INPUT_ERR_OPEN_V_OVERFLOW"
    | "INPUT_ERR_CLOSE_V_OVERFLOW"
    | "INPUT_ERR_MIN_VIOLATES_OPEN_CLOSE_RANGE";
export type CandlestickData = {
    timestamp: bigint;
    min: number;
    max: number;
    open: number;
    close: number;
};
export function CandlestickData({timestamp, min, max, open, close}: CandlestickData): CandlestickDataR {
    if (timestamp < 0n) return Err("INPUT_ERR_TIMESTAMP_V_UNDERFLOW");
    if (min < 0) return Err("INPUT_ERR_MIN_V_UNDERFLOW");
    if (max < 0) return Err("INPUT_ERR_MAX_V_UNDERFLOW");
    if (open < 0) return Err("INPUT_ERR_OPEN_V_UNDERFLOW");
    if (close < 0) return Err("INPUT_ERR_CLOSE_V_UNDERFLOW");
    if (min > Number.MAX_SAFE_INTEGER) return Err("INPUT_ERR_MIN_V_OVERFLOW");
    if (max > Number.MAX_SAFE_INTEGER) return Err("INPUT_ERR_MAX_V_OVERFLOW");
    if (open > Number.MAX_SAFE_INTEGER) return Err("INPUT_ERR_OPEN_V_OVERFLOW");
    if (close > Number.MAX_SAFE_INTEGER) return Err("INPUT_ERR_CLOSE_V_OVERFLOW");
    return Ok({timestamp, min, max, open, close});
}