import type { IntegerBrand } from "@root";

type MathErrorFactoryRangeViolationPayload = {
    value: number | bigint;
    lower: bigint;
    upper: bigint;
    brand: IntegerBrand;
};

function MathErrorFactoryRangeViolationPayload(_this: MathErrorFactoryRangeViolationPayload): MathErrorFactoryRangeViolationPayload {
    /** @constructor */ {
        return _this;
    }
}

export { MathErrorFactoryRangeViolationPayload };