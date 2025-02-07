import type { Result as Result$0 } from "@root";
import type { Wrapper } from "@root";
import type { Closure } from "@root";
import { INTERNAL_ERROR_MESSAGE, wrap } from "@root";
import { Err } from "@root";
import { Ok } from "@root";

export type Fpv<T1 extends Fpv.Precision> = 
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
    cst<T2 extends Fpv.Precision>(precision: T2): Fpv.Result<Fpv<T2>>;
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

    function cst<T2 extends Fpv.Precision>(precision$0: T2): Fpv.Result<Fpv<T2>> {
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
        | "FPV.ERR_PRECISION_IS_NEGATIVE"
        | "FPV.ERR_CANNOT_SQUARE_NAGATIVE";

    export type Compatible<T1 extends bigint = 2n> = Fpv<T1> | bigint;

    export type Precision = bigint;

    export type Calculator = {
        unwrap<T1 extends Precision = 0n>(value: Compatible<T1>): bigint;
        eq<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean;
        lt<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean;
        gt<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean;
        lteq<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean;
        gteq<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean;
        add<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): Fpv<T1>;
        sub<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): Fpv<T1>;
        mul<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): Fpv<T1>;
        div<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): Result<Fpv<T1>>;
        sqrt<T1 extends Precision>(value: Compatible<T1>): Result<Fpv<T1>>;
        cst<T1 extends Precision = 0n, T2 extends Precision = 0n>(value: Compatible<T1>, oldPrecision: T1, newPrecision: T2): Result<Fpv<T2>>;
    };

    export const Calculator: Calculator = (() => {
        {
            return {
                unwrap,
                eq
            };
        }

        function unwrap<T1 extends bigint>(value: Fpv.Compatible<T1>): bigint {
            if (typeof value === "bigint") return value;
            return value.unwrap();
        }

        function eq<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean {
            return unwrap(value0) === unwrap(value1);
        }

        function lt<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean {
            return unwrap(value0) < unwrap(value1);
        }

        function gt<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean {
            return unwrap(value0) > unwrap(value1);
        }

        function lteq<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean {
            return eq(value0, value1) || lt(value0, value1);
        }

        function gteq<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): boolean {
            return eq(value0, value1) || gt(value0, value1);
        }

        function add<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): Fpv<T1> {
            return Fpv<T1>(unwrap(value0) + unwrap(value1)).expect();
        }

        function sub<T1 extends Precision = 0n>(value0: Compatible<T1>, value1: Compatible<T1>): Fpv<T1> {
            return Fpv<T1>(unwrap(value0) - unwrap(value1)).expect();
        }

        function mul<T1 extends Precision = 2n>(value0: Compatible<T1>, value1: Compatible<T1>, precision: T1 = (2n as any)): Fpv<T1> {
            let n0: bigint = unwrap(value0);
            let n1: bigint = unwrap(value1);
            let z: bigint = n0 * n1;
            if (precision === 0n) return Fpv<T1>(z).expect();
            return Fpv<T1>(z / 10n ** precision).expect();
        }

        function div<T1 extends Precision = 2n>(value0: Compatible<T1>, value1: Compatible<T1>, decimals: T1 = (2n as any)): Result<Fpv<T1>> {
            let n0: bigint = unwrap(value0);
            let n1: bigint = unwrap(value1);
            if (n1 === 0n) return Err("FPV.ERR_DIVISION_BY_ZERO");
            if (decimals === 0n) return Ok(Fpv(n0 / n1, decimals).expect());
            let z: bigint = n0 * (10n ** decimals);
            let q: bigint = z / n0;
            return Ok(Fpv(q, decimals).expect());
        }

        function sqrt<T1 extends Precision = 2n>(value: Compatible<T1>, decimals: T1 = (2n as any)): Result<Fpv<T1>> {
            let n: bigint = unwrap(value);
            if (n < 0n) return Err("FPV.ERR_CANNOT_SQUARE_NAGATIVE");
            if (n === 0n) return Ok(Fpv(0n, decimals).expect());
            let one: bigint = n * (10n ** decimals);
            let x: bigint = (n * one + 1n) / 2n;
            let y: bigint; do {
                y = x;
                x = (x + n * one / x) / 2n;
            }
            while (x !== y);
            return Ok(Fpv(x, decimals).expect());
        }


        function cst<T1 extends Precision = 0n, T2 extends Precision = 0n>(value: Fpv.Compatible<T1>, oldPrecision: T1 = (0n as any), newPrecision: T2 = (0n as any)): Fpv.Result<Fpv<T2>> {
            return wrap(() => {})
                .and(() => {
                    return oldPrecision < 0n ? Err("FPV.ERR_PRECISION_IS_NEGATIVE") : Ok(undefined);
                })
                .and(() => {
                    return newPrecision < 0n ? Err("FPV.ERR_PRECISION_IS_NEGATIVE") : Ok(undefined);
                })
                .and(() => {
                    return newPrecision === 0n
                        ? Ok(Fpv<T2>(unwrap(value) / (10n ** oldPrecision), newPrecision).expect())
                        : Ok(Fpv<T2>(
                            newPrecision > oldPrecision
                                ? unwrap(value) * (
                                    10n **
                                    newPrecision > oldPrecision
                                        ? (newPrecision - oldPrecision as unknown as bigint)
                                        : (oldPrecision - newPrecision as unknown as bigint)
                                )
                                : unwrap(value) / (
                                    10n ** 
                                    newPrecision > oldPrecision
                                        ? (newPrecision - oldPrecision as unknown as bigint)
                                        : (oldPrecision - newPrecision as unknown as bigint)
                                )
                        ).expect());
                })
                .mapErr(e => {
                    /// `e` cannot be `Unsafe` because the initial
                    /// `wrap` call does not fail.
                    return (e as ErrorCode);
                });
        }
    })();
}