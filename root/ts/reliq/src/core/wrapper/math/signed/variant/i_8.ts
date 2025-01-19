import {
    type SignedInteger,
    type SignedIntegerResult,
    type Numeric,
    type Branded,
    type Wrapper,
} from "@root";
import {
    MAX_I_8,
    MIN_I_8
} from "@root";

export type I8 = 
    & Branded<"I8">
    & Wrapper<bigint>
    & {
    eq(value: SignedInteger): boolean;
    lt(value: SignedInteger): boolean;
    gt(value: SignedInteger): boolean;
    lteq(value: SignedInteger): boolean;
    gteq(value: SignedInteger): boolean;
    add(value: SignedInteger): SignedIntegerResult<I8>;
    sub(value: SignedInteger): SignedIntegerResult<I8>;
    mul(value: SignedInteger): SignedIntegerResult<I8>;
    div(value: SignedInteger): SignedIntegerResult<I8>;
    pow(value: SignedInteger): SignedIntegerResult<I8>;
};

export function I8<T1 extends Numeric>(_value: T1): SignedIntegerResult<I8> {
    /** @constructor */ {
        return {};
    }

    function eq(value: SignedInteger): boolean {

    }

    function lt(value: SignedInteger): boolean {

    }

    function gt(value: SignedInteger): boolean {

    }

    function lteq(value: SignedInteger): boolean {

    }

    function gteq(value: SignedInteger): boolean {

    }

    function add(value: SignedInteger): SignedIntegerResult<I8> {

    }

    function sub(value: SignedInteger): SignedIntegerResult<I8> {

    }

    function mul(value: SignedInteger): SignedIntegerResult<I8> {

    }

    function div(value: SignedInteger): SignedIntegerResult<I8> {

    }

    function pow(value: SignedInteger)
}