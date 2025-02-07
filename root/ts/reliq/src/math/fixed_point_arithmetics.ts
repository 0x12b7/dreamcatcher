import type { Result as Result$0 } from "@root";
import type { Wrapper } from "@root";
import { INTERNAL_ERROR_MESSAGE } from "@root";
import { Err } from "@root";
import { Ok } from "@root";

export type Fpv<T1 extends Fpv.Decimals> = 
    & Wrapper<bigint>
    & {
    decimals(): T1;
    representation(): bigint;
    eq(x: bigint): boolean;
    eq(x: Fpv<T1>): boolean;
    eq(x: Fpv.Compatible<T1>): boolean;
    lt(x: bigint): boolean;
    lt(x: Fpv<T1>): boolean;
    lt(x: Fpv.Compatible<T1>): boolean;
    gt(x: bigint): boolean;
    gt(x: Fpv<T1>): boolean;
    gt(x: Fpv.Compatible<T1>): boolean;
    lteq(x: bigint): boolean;
    lteq(x: Fpv<T1>): boolean;
    lteq(x: Fpv.Compatible<T1>): boolean;
    gteq(x: bigint): boolean;
    gteq(x: Fpv<T1>): boolean;
    gteq(x: Fpv.Compatible<T1>): boolean;
    add(x: bigint): Fpv<T1>;
    add(x: Fpv<T1>): Fpv<T1>;
    add(x: Fpv.Compatible<T1>): Fpv<T1>;
    sub(x: bigint): Fpv<T1>;
    sub(x: Fpv<T1>): Fpv<T1>;
    sub(x: Fpv.Compatible<T1>): Fpv<T1>;
    mul(x: bigint): Fpv<T1>;
    mul(x: Fpv<T1>): Fpv<T1>;
    mul(x: Fpv.Compatible<T1>): Fpv<T1>;
    div(x: bigint): Fpv.Result<Fpv<T1>>;
    div(x: Fpv<T1>): Fpv.Result<Fpv<T1>>;
    div(x: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>>;
    sqrt(): Fpv.Result<Fpv<T1>>;
    cst<T2 extends Fpv.Decimals>(decimals: T2): Fpv.Result<Fpv<T2>>;
};

export function Fpv<T1 extends Fpv.Decimals>(_v: Fpv.Compatible<T1>, _decimals: T1): Fpv.Result<Fpv<T1>> {
    {
        if (decimals() < 0n) return Err("FPV.ERR_NEGATIVE_DECIMALS");
        return Ok({
            unwrap,
            decimals,
            representation,
            eq,
            lt,
            gt,
            lteq,
            gteq,
            add,
            sub,
            mul,
            div,
            sqrt,
            cst
        });
    }

    function unwrap(): bigint {
        return Fpv.Calculator.unwrap(_v);
    }

    function decimals(): T1 {
        return _decimals;
    }

    function representation(): bigint {
        return 10n ** decimals();
    }

    function eq(x: bigint): boolean;
    function eq(x: Fpv<T1>): boolean;
    function eq(x: Fpv.Compatible<T1>): boolean {
        return Fpv.Calculator.eq(_v, x);
    }

    function lt(x: bigint): boolean;
    function lt(x: Fpv<T1>): boolean;
    function lt(x: Fpv.Compatible<T1>): boolean {
        return Fpv.Calculator.lt(_v, x);
    }

    function gt(x: bigint): boolean;
    function gt(x: Fpv<T1>): boolean;
    function gt(x: Fpv.Compatible<T1>): boolean {
        return Fpv.Calculator.gt(_v, x);
    }

    function lteq(x: bigint): boolean;
    function lteq(x: Fpv<T1>): boolean;
    function lteq(x: Fpv.Compatible<T1>): boolean {
        return Fpv.Calculator.lteq(_v, x);
    }

    function gteq(x: bigint): boolean;
    function gteq(x: Fpv<T1>): boolean;
    function gteq(x: Fpv.Compatible<T1>): boolean {
        return Fpv.Calculator.gteq(_v, x);
    }

    function add(x: bigint): Fpv<T1>;
    function add(x: Fpv<T1>): Fpv<T1>;
    function add(x: Fpv.Compatible<T1>): Fpv<T1> {
        return Fpv.Calculator.add(_v, x, decimals());
    }

    function sub(x: bigint): Fpv<T1>;
    function sub(x: Fpv<T1>): Fpv<T1>;
    function sub(x: Fpv.Compatible<T1>): Fpv<T1> {
        return Fpv.Calculator.sub(_v, x, decimals());
    }

    function mul(x: bigint): Fpv<T1>;
    function mul(x: Fpv<T1>): Fpv<T1>;
    function mul(x: Fpv.Compatible<T1>): Fpv<T1> {
        return Fpv.Calculator.mul(_v, x, decimals());
    }

    function div(x: bigint): Fpv.Result<Fpv<T1>>;
    function div(x: Fpv<T1>): Fpv.Result<Fpv<T1>>;
    function div(x: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>> {
        return Fpv.Calculator.div(_v, x, decimals());
    }

    function sqrt(): Fpv.Result<Fpv<T1>> {
        return Fpv.Calculator.sqrt(_v, decimals());
    }

    function cst<T2 extends Fpv.Decimals>(decimals$0: T2): Fpv.Result<Fpv<T2>> {
        return Fpv.Calculator.cst(_v, decimals(), decimals$0);
    }
}

export namespace Fpv {
    export type Result<T1> = Result$0<T1, ErrorCode>;

    export type ErrorCode = 
        | "FPV.ERR_DIVISION_BY_ZERO"
        | "FPV.ERR_NEGATIVE_DECIMALS"
        | "FPV.ERR_CANNOT_SQUARE_NAGATIVE";

    export type Compatible<T1 extends Decimals = Decimals> = Fpv<T1> | bigint;

    export type Decimals = bigint;

    export type Calculator = {
        unwrap(value: Compatible<Decimals>): bigint;
        eq<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        eq<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        eq<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        eq<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): boolean;
        eq<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        lt<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        lt<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        lt<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        lt<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): boolean;
        lt<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        gt<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        gt<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        gt<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        gt<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): boolean;
        gt<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        lteq<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        lteq<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        lteq<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        lteq<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T1>): boolean;
        lteq<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        gteq<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        gteq<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        gteq<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        gteq<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T1>): boolean;
        gteq<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        add<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Fpv<T1>;
        add<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Fpv<T1>;
        add<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Fpv<T1>;
        add<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Fpv<T1>;
        add<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Fpv<T1>;
        sub<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Fpv<T1>;
        sub<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Fpv<T1>;
        sub<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Fpv<T1>;
        sub<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Fpv<T1>;
        sub<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Fpv<T1>;
        mul<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Fpv<T1>;
        mul<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Fpv<T1>;
        mul<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Fpv<T1>;
        mul<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Fpv<T1>;
        mul<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Fpv<T1>;
        div<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Result<Fpv<T1>>;
        div<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Result<Fpv<T1>>;
        div<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        div<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Result<Fpv<T1>>;
        div<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Result<Fpv<T1>>;    
        sqrt<T1 extends Decimals>(x: bigint, decimals: T1): Result<Fpv<T1>>;
        sqrt<T1 extends Decimals>(x: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        sqrt<T1 extends Decimals>(x: Compatible<T1>, decimals: T1): Result<Fpv<T1>>; 
        cst<T1 extends Decimals, T2 extends Decimals>(x: bigint, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
        cst<T1 extends Decimals, T2 extends Decimals>(x: Fpv<T1>, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
        cst<T1 extends Decimals, T2 extends Decimals>(x: Compatible<T1>, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
    };

    export const Calculator: Calculator = (() => {
        {
            return {
                unwrap,
                eq,
                lt,
                gt,
                lteq,
                gteq,
                add,
                sub,
                mul,
                div,
                sqrt,
                cst
            };
        }

        function unwrap(value: Compatible<Decimals>): bigint {
            return typeof value === "bigint" ? value : value.unwrap();
        }

        function eq<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        function eq<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        function eq<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        function eq<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): boolean;
        function eq<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean {
            return unwrap(x) === unwrap(y);
        }

        function lt<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        function lt<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        function lt<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        function lt<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): boolean;
        function lt<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean {
            return unwrap(x) < unwrap(y);
        }

        function gt<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        function gt<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        function gt<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        function gt<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): boolean;
        function gt<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean {
            return unwrap(x) > unwrap(y);
        }

        function lteq<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        function lteq<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        function lteq<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        function lteq<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T1>): boolean;
        function lteq<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean {
            return unwrap(x) <= unwrap(y);
        }

        function gteq<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        function gteq<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        function gteq<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        function gteq<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T1>): boolean;
        function gteq<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean {
            return unwrap(x) >= unwrap(y);
        }

        function add<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Fpv<T1>;
        function add<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Fpv<T1>;
        function add<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Fpv<T1>;
        function add<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Fpv<T1>;
        function add<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Fpv<T1> {
            return Fpv<T1>(unwrap(x) + unwrap(y), decimals).expect(INTERNAL_ERROR_MESSAGE);
        }

        function sub<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Fpv<T1>;
        function sub<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Fpv<T1>;
        function sub<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Fpv<T1>;
        function sub<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Fpv<T1>;
        function sub<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Fpv<T1> {
            return Fpv<T1>(unwrap(x) - unwrap(y), decimals).expect(INTERNAL_ERROR_MESSAGE);
        }

        function mul<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Fpv<T1>;
        function mul<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Fpv<T1>;
        function mul<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Fpv<T1>;
        function mul<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Fpv<T1>;
        function mul<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Fpv<T1> {
            let x$0: bigint = unwrap(x);
            let y$0: bigint = unwrap(y);
            let z: bigint = x$0 * y$0;
            if (decimals === 0n) return Fpv<T1>(z, decimals).expect(INTERNAL_ERROR_MESSAGE);
            return Fpv<T1>(z / (10n ** decimals), decimals).expect(INTERNAL_ERROR_MESSAGE);
        }

        function div<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Result<Fpv<T1>>;
        function div<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Result<Fpv<T1>>;
        function div<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        function div<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Result<Fpv<T1>>;
        function div<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Result<Fpv<T1>> {
            let x$0: bigint = unwrap(x);
            let y$0: bigint = unwrap(y);
            if (y$0 === 0n) return Err("FPV.ERR_DIVISION_BY_ZERO");
            if (decimals === 0n) return Ok(Fpv(x$0 / y$0, decimals).expect(INTERNAL_ERROR_MESSAGE));    
            let z: bigint = x$0 * (10n ** decimals);
            let q: bigint = z / x$0;
            return Ok(Fpv(q, decimals).expect(INTERNAL_ERROR_MESSAGE));
        }

        function sqrt<T1 extends Decimals>(x: bigint, decimals: T1): Result<Fpv<T1>>;
        function sqrt<T1 extends Decimals>(x: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        function sqrt<T1 extends Decimals>(x: Compatible<T1>, decimals: T1): Result<Fpv<T1>> {
            let x$0: bigint = unwrap(x);
            if (x$0 < 0n) return Err("FPV.ERR_CANNOT_SQUARE_NAGATIVE");
            if (x$0 === 0n) return Ok(Fpv(0n, decimals).expect(INTERNAL_ERROR_MESSAGE));
            let one: bigint = x$0 * (10n ** decimals);
            let x$1: bigint = (x$0 * one + 1n) / 2n;
            let y: bigint;
            do {
                y = x$1;
                x$1 = (x$1 + x$0 * one / x$1) / 2n; 
            }
            while(x$1 !== y);
            return Ok(Fpv(x, decimals).expect(INTERNAL_ERROR_MESSAGE));
        }

        function cst<T1 extends Decimals, T2 extends Decimals>(x: bigint, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
        function cst<T1 extends Decimals, T2 extends Decimals>(x: Fpv<T1>, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
        function cst<T1 extends Decimals, T2 extends Decimals>(x: Compatible<T1>, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>> {
            if (oldDecimals < 0n) return Err("FPV.ERR_NEGATIVE_DECIMALS");
            if (newDecimals < 0n) return Err("FPV.ERR_NEGATIVE_DECIMALS");
            if (newDecimals === 0n) return Ok(Fpv(unwrap(x) / (10n ** oldDecimals), newDecimals).expect(INTERNAL_ERROR_MESSAGE));
            return Ok(Fpv(
                newDecimals > oldDecimals
                    ? unwrap(x) * (
                        10n **
                        newDecimals > oldDecimals
                            ? (newDecimals - oldDecimals as unknown as bigint)
                            : (oldDecimals - newDecimals as unknown as bigint)
                    )
                    : unwrap(x) / (
                        10n **
                        newDecimals > oldDecimals
                            ? (newDecimals - oldDecimals as unknown as bigint)
                            : (oldDecimals - newDecimals as unknown as bigint)
                    ),
                newDecimals
            ).expect(INTERNAL_ERROR_MESSAGE));
        }
    })();
}