import type { Numeric } from "@root";
import type { SignedIntegerBrand } from "@root";
import type { SignedIntegerBrandToTypeMap } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Option } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { RangeFinder } from "@root";
import { MathErrorFactory } from "@root";
import { MathErrorFactoryRangeViolationPayload } from "@root";
import { isBrand } from "@root";
import { isWrapper } from "@root";

type SignedIntegerParser = {
    parse<T1 extends SignedIntegerBrand, T2 extends Numeric>(brand: T1, from: T2, instance: SignedIntegerBrandToTypeMap<T1>): SignedIntegerResultMap<SignedIntegerBrandToTypeMap<T1>, T2>;
};

function SignedIntegerParser(): SignedIntegerParser {
    /** @constructor */ {
        return { parse };
    }

    function parse<T1 extends SignedIntegerBrand, T2 extends Numeric>(brand: T1, from: T2, instance: SignedIntegerBrandToTypeMap<T1>): SignedIntegerResultMap<SignedIntegerBrandToTypeMap<T1>, T2> {
        return _parse(brand, from, instance);
    }
}

function _parse<T1 extends SignedIntegerBrand, T2 extends Numeric>(brand: T1, from: T2, instance: SignedIntegerBrandToTypeMap<T1>): SignedIntegerResultMap<SignedIntegerBrandToTypeMap<T1>, T2> {
    let rO: Option<SignedIntegerResultMap<SignedIntegerBrandToTypeMap<T1>, T2>> = None;
    RangeFinder(brand)
        .range()
        .map(range => {
            let lower: bigint = range[0];
            let upper: bigint = range[1];
            if (rO.none() && _unwrap(from) < lower) rO = Some(Err(MathErrorFactory().spawnLowerArithmeticRangeViolation(MathErrorFactoryRangeViolationPayload({ brand, lower, upper, value: _unwrap(from) }))) as any);
            if (rO.none() && _unwrap(from) > upper) rO = Some(Err(MathErrorFactory().spawnUpperArithmeticRangeViolation(MathErrorFactoryRangeViolationPayload({ brand, lower, upper, value: _unwrap(from) }))) as any);
            return;
        });
    if ((typeof from === "number" || isBrand(from, "Float")) && (_unwrap(from) as number) % 1 !== 0) rO = Some(Err(MathErrorFactory().spawnPrecisionViolation(brand, (_unwrap(from) as number))) as any);
    if (rO.some()) return rO.unwrapSafely();
    return Ok(instance) as any;
}

function _unwrap(value: Numeric): number | bigint {
    if (isWrapper(value)) return value.unwrap();
    return value;
}

export { SignedIntegerParser };