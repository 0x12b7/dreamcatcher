import {
    type IntegerBrand
} from "@root";

export type LoggerRangeViolationPayload = {
    value: number | bigint;
    lower: bigint;
    upper: bigint;
    brand: IntegerBrand;
};

export function LoggerRangeViolationPayload(_this: LoggerRangeViolationPayload): LoggerRangeViolationPayload {
    /** @constructor */ {
        return _this;
    }
}