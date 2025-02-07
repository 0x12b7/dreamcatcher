import type { Result as Result$0 } from "@root";
import type { Wrapper } from "@root";
import type { Closure } from "@root";
import { INTERNAL_ERROR_MESSAGE, wrap } from "@root";
import { Err } from "@root";
import { Ok } from "@root";

export type Fpv<T1 extends Fpv.Decimals> = 
    & Wrapper<bigint>
    & {
    precision(): T1;
    representation(): bigint;
    eq(value: Fpv.Compatible<T1>): boolean;
    lt(value: Fpv.Compatible<T1>): boolean;
    gt(value: Fpv.Compatible<T1>): boolean;
    lteq(value: Fpv.Compatible<T1>): boolean;
    gteq(value: Fpv.Compatible<T1>): boolean;
    add(value: Fpv.Compatible<T1>): Fpv<T1>;
    sub(value: Fpv.Compatible<T1>): Fpv<T1>;
    mul(value: Fpv.Compatible<T1>): Fpv<T1>;
    div(value: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>>;
    sqrt(): Fpv.Result<Fpv<T1>>;
    lerp(to: Fpv.Compatible<T1>, percentage: Fpv.Compatible<T1>): Fpv<T1>;
    cst<T2 extends Fpv.Decimals>(precision: T2): Fpv.Result<Fpv<T2>>;
};

export function Fpv<T1 extends bigint = 2n>(_value: Fpv.Compatible<T1>, _precision: T1 = (2n as any)): Fpv.Result<Fpv<T1>> {
    {
        if (precision() < 0n) return Err("FPV.ERR_PRECISION_IS_NEGATIVE");
        return Ok({
            unwrap,
            precision,
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
            lerp,
            cst
        });
    }

    function unwrap(): bigint {
        return _unwrap(_value);
    }

    function precision(): T1 {
        return _precision;
    }

    function representation(): bigint {
        return 10n**precision();
    }

    function eq(value: Fpv.Compatible<T1>): boolean {
        return Fpv.Calculator.eq(_value, value);
    }

    function lt<T2>(value: Fpv.Compatible<T1>): boolean {
        return _unwrap(_value) < _unwrap(value);
    }

    function gt(value: Fpv.Compatible<T1>): boolean {
        return _unwrap(_value) > _unwrap(value);
    }

    function lteq(value: Fpv.Compatible<T1>): boolean {
        return _unwrap(_value) <= _unwrap(value);
    }

    function gteq(value: Fpv.Compatible<T1>): boolean {
        return _unwrap(_value) >= _unwrap(value);
    }

    function add(value: Fpv.Compatible<T1>): Fpv<T1> {
        return _wrap(() => {
            return _unwrap(_value) + _unwrap(value);
        });
    }

    function sub(value: Fpv.Compatible<T1>): Fpv<T1> {
        return _wrap(() => {
            return _unwrap(_value) - _unwrap(value);
        });
    }

    function mul(value: Fpv.Compatible<T1>): Fpv<T1> {
        let n0: bigint = _unwrap(_value);
        let n1: bigint = _unwrap(value);
        let z: bigint = n0 * n1;
        if (precision() === 0n) {
            return _wrap(() => {
                return z
            });
        }
        return _wrap(() => {
            return z / representation();
        });
    }

    function div(value: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>> {
        let n: bigint = _unwrap(value);
        if (n === 0n) return Err("FPV.ERR_DIVISION_BY_ZERO");
        return Ok(_wrap(() => {
            let z: bigint = _unwrap(_value) * representation();
            let q: bigint = z / n;
            return q;
        }));
    }

    function sqrt(): Fpv.Result<Fpv<T1>> {
        let n: bigint = _unwrap(_value);
        if (n < 0n) return Err("FPV.ERR_CANNOT_SQUARE_NAGATIVE");
        if (n === 0n) return Ok(Fpv<T1>(0n).expect("Failed to initialize `Fpv`."));
        let x: bigint = (n * representation() + 1n) / 2n;
        let y: bigint;
        do {
            y = x;
            x = (x + n * representation() / x) / 2n;
        }
        while (x !== y);
        return Ok(Fpv<T1>(x).expect(""));
    }

    function lerp(to: Fpv.Compatible<T1>, percentage: Fpv.Compatible<T1>): Fpv<T1> {
        let n0: Fpv<T1> =  _wrap(() => {
            return _unwrap(_value);
        });
        let n1: Fpv<T1> = _wrap(() => {
            return _unwrap(to);
        });
        let percentage$0: Fpv<T1> = _wrap(() => {
            return _unwrap(percentage);
        });
        

        let one: bigint = 1n * representation();
        let one$0: Fpv<T1> = Fpv(one, precision()).expect("");
        let x: bigint = one$0
            .sub(percentage$0)
            .unwrap();
        let y: bigint = Fpv<T1>(n1)
            .expect("")
            .mul(percentage$0)
            .unwrap();
        return Fpv(n0, precision())
            .expect("")
            .mul(x)
            .add(y);
    }

    function cst<T2 extends Fpv.Decimals>(precision$0: T2): Fpv.Result<Fpv<T2>> {
        return Fpv.Calculator.cst(unwrap(), precision(), precision$0);
    }

    function _wrap(task: Closure<[], bigint>): Fpv<T1> {
        return Fpv<T1>(task()).expect("Fpv: Failed to wrap the task result to a new `Fpv` of type `T1`." + INTERNAL_ERROR_MESSAGE);
    }

    function _unwrap(value: Fpv.Compatible<T1>): bigint {
        if (typeof value === "bigint") return value;
        return value.unwrap();
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
        add<T1 extends Decimals>(x: bigint, y: bigint): Fpv<T1>;
        add<T1 extends Decimals>(x: Fpv<T1>, y: bigint): Fpv<T1>;
        add<T1 extends Decimals>(x: bigint, y: Fpv<T1>): Fpv<T1>;
        add<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): Fpv<T1>;
        add<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): Fpv<T1>;
        sub<T1 extends Decimals>(x: bigint, y: bigint): Fpv<T1>;
        sub<T1 extends Decimals>(x: Fpv<T1>, y: bigint): Fpv<T1>;
        sub<T1 extends Decimals>(x: bigint, y: Fpv<T1>): Fpv<T1>;
        sub<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): Fpv<T1>;
        sub<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): Fpv<T1>;
        mul<T1 extends Decimals>(x: bigint, y: bigint): Fpv<T1>;
        mul<T1 extends Decimals>(x: Fpv<T1>, y: bigint): Fpv<T1>;
        mul<T1 extends Decimals>(x: bigint, y: Fpv<T1>): Fpv<T1>;
        mul<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): Fpv<T1>;
        mul<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): Fpv<T1>;
        div<T1 extends Decimals>(x: bigint, y: bigint): Result<Fpv<T1>>;
        div<T1 extends Decimals>(x: Fpv<T1>, y: bigint): Result<Fpv<T1>>;
        div<T1 extends Decimals>(x: bigint, y: Fpv<T1>): Result<Fpv<T1>>;
        div<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): Result<Fpv<T1>>;
        div<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): Result<Fpv<T1>>;    
        sqrt<T1 extends Decimals>(x: bigint, y: bigint): Result<Fpv<T1>>;
        sqrt<T1 extends Decimals>(x: Fpv<T1>, y: bigint): Result<Fpv<T1>>;
        sqrt<T1 extends Decimals>(x: bigint, y: Fpv<T1>): Result<Fpv<T1>>;
        sqrt<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): Result<Fpv<T1>>;
        sqrt<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): Result<Fpv<T1>>;
        cst<T1 extends Decimals, T2 extends Decimals>(x: bigint, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
        cst<T1 extends Decimals, T2 extends Decimals>(x: Fpv<T1>, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
        cst<T1 extends Decimals, T2 extends Decimals>(x: Compatible<T1>, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
    };

    export const Calculator: Calculator = (() => {
        /** @constructor */ {
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

        




        function gteq<T1 extends Decimals = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean {
            return eq(value0, value1) || gt(value0, value1);
        }

        add<18n>(500n, 500n)

        function add<T1 extends Decimals, T2 extends T1 = T1>(value0: Compatible<T1>, value1: Compatible<T2>): Fpv<T1> {
            return Fpv<T1>(unwrap(value0) + unwrap(value1)).expect();
        }

        function sub<T1 extends Decimals = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): Fpv<T1> {
            return Fpv<T1>(unwrap(value0) - unwrap(value1)).expect();
        }

        function mul<T1 extends Decimals = 2n>(value0: Compatible<T1>, value1: Compatible<T1>, precision: T1 = (2n as any)): Fpv<T1> {
            let n0: bigint = unwrap(value0);
            let n1: bigint = unwrap(value1);
            let z: bigint = n0 * n1;
            if (precision === 0n) return Fpv<T1>(z).expect();
            return Fpv<T1>(z / 10n ** precision).expect();
        }

        function div<T1 extends Decimals = 2n>(value0: Compatible<T1>, value1: Compatible<T1>, decimals: T1 = (2n as any)): Result<Fpv<T1>> {
            let n0: bigint = unwrap(value0);
            let n1: bigint = unwrap(value1);
            if (n1 === 0n) return Err("FPV.ERR_DIVISION_BY_ZERO");
            if (decimals === 0n) return Ok(Fpv(n0 / n1, decimals).expect());
            let z: bigint = n0 * (10n ** decimals);
            let q: bigint = z / n0;
            return Ok(Fpv(q, decimals).expect());
        }

        function sqrt<T1 extends Decimals = 2n>(value: Compatible<T1>, decimals: T1 = (2n as any)): Result<Fpv<T1>> {
            let n: bigint = unwrap(value);
            if (n < 0n) return Err("FPV.ERR_CANNOT_SQUARE_NAGATIVE");
            if (n === 0n) return Ok(Fpv(0n, decimals).expect(`Fpv: Failed to initialize a fixed point value whilst calculating the square root of ${ unwrap(value) } at ${ decimals } decimals.` + INTERNAL_ERROR_MESSAGE));
            let one: bigint = n * (10n ** decimals);
            let x: bigint = (n * one + 1n) / 2n;
            let y: bigint; do {
                y = x;
                x = (x + n * one / x) / 2n;
            }
            while (x !== y);
            return Ok(Fpv(x, decimals).expect(`Fpv: Failed to initialize a fixed point value whilst calculating the square root of ${ unwrap(value) } at ${ decimals } decimals.` + INTERNAL_ERROR_MESSAGE));
        }

        function cst<T1 extends Decimals, T2 extends Decimals>(value: Compatible<T1>, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>> {
            if (oldDecimals < 0n) return Err("FPV.ERR_NEGATIVE_DECIMALS");
            if (newDecimals < 0n) return Err("FPV.ERR_NEGATIVE_DECIMALS");
            if (newDecimals === 0n) return Ok(Fpv(unwrap(value) / (10n ** oldDecimals), newDecimals).expect(`Fpv: Failed to initialize a fixed point value whilst converting from ${ oldDecimals } decimals to ${ newDecimals } decimals.` + INTERNAL_ERROR_MESSAGE));
            return Ok(Fpv(
                newDecimals > oldDecimals
                    ? unwrap(value) * (
                        10n **
                        newDecimals > oldDecimals
                            ? (newDecimals - oldDecimals as unknown as bigint)
                            : (oldDecimals - newDecimals as unknown as bigint)
                    )
                    : unwrap(value) / (
                        10n **
                        newDecimals > oldDecimals
                            ? (newDecimals - oldDecimals as unknown as bigint)
                            : (oldDecimals - newDecimals as unknown as bigint)
                    ),
                newDecimals
            ).expect(`Fpv: Failed to initialize a fixed point value whilst converting from ${ oldDecimals } decimals to ${ newDecimals } decimals.` + INTERNAL_ERROR_MESSAGE));
        }
    })();
}