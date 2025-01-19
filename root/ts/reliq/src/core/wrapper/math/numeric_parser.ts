import {
    type Numeric,
    type Option,
    MAX_NUMBER,
    MIN_NUMBER,
    Some,
    None,
    isBranded
} from "@root";

export type NumericParser = {
    parseAsBigInt(value: Numeric): Option<bigint>;
    parseAsNumber(value: Numeric): Option<number>;
};

export function NumericParser(): NumericParser {
    /** @constructor */ {
        return { parseAsBigInt, parseAsNumber };
    }

    function parseAsBigInt(value: Numeric): Option<bigint> {
        if (typeof value === "bigint") return Some(value);
        if (typeof value === "number") return _bigint(value);
        if (isBranded(value, "Float")) return _bigint(value.unwrap());
        return Some(value.unwrap());
    }

    function parseAsNumber(value: Numeric): Option<number> {
        if (typeof value === "number") return Some(value);
        if (isBranded(value, "Float")) return Some(value.unwrap());
        if (typeof value === "bigint") return _number(value);
        return _number(value.unwrap());
    }
   
    function _bigint(value: number): Option<bigint> {
        if (!Number.isFinite(value)) return None;
        if (!Number.isSafeInteger(value)) return None;
        if (Number.isNaN(value)) return None;
        if (value % 1 !== 0) return None;
        if (value < MIN_NUMBER) return None;
        if (value > MAX_NUMBER) return None;
        if (_lost(value)) return None;
        return Some(BigInt(value));
    }

    function _number(value: bigint): Option<number> {
        if (value < BigInt(MIN_NUMBER)) return None;
        if (value > BigInt(MAX_NUMBER)) return None;
        if (_lost(value)) return None;
        return Some(Number(value));
    }

    function _lost(value: number): boolean;
    function _lost(value: bigint): boolean;
    function _lost(args0: number | bigint): boolean {
        let value: number | bigint = args0;
        return typeof value === "number"
            ? Number(BigInt(value)) !== value
            : BigInt(Number(value)) !== value;
    }
}