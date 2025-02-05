import type { Wrapper } from "@root";
import { Result } from "@root";
import { Ok } from "@root";
import { Err } from "@root";

type _Result<T1, T2> = Result<T1, T2>;

export namespace Math {



    export type Vec<T1 extends bigint = 0n> = {

    };

    export function Vec<T1 extends bigint = 0n>(_x: Fpv.Compatible<T1>, _y: Fpv.Compatible<T1>): Vec<T1> {

    }


    export type Fpv<T1 extends bigint = 2n> = 
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
    };

    export function Fpv<T1 extends bigint = 0n>(_value: Fpv.Compatible<T1>, _precision: T1 = (2n as any)): Fpv.Result<Fpv<T1>> {
        /** @constructor */ {
            if (precision() === 0n) return Err("FPV.ERR_PRECISION_IS_ZERO");
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
                div
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
            return _unwrap(_value) === _unwrap(value);
        }

        function lt(value: Fpv.Compatible<T1>): boolean {
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
            return _wrap(() => {
                let z: bigint = _unwrap(_value) * _unwrap(value);
                let q: bigint = z / representation();
                return q;
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

        function _wrap(task: Closure<[], bigint>): Fpv<T1> {
            return Fpv<T1>(task()).expect("Fpv: Failed to wrap the task result to a new `Fpv` of type `T1`." + INTERNAL_ERROR_MESSAGE);
        }

        function _unwrap(value: Fpv.Compatible<T1>): bigint {
            if (typeof value === "bigint") return value;
            return value.unwrap();
        }
    }

    export namespace Fpv {
        export type Result<T1> = _Result0<T1, ErrorCode>;

        export type ErrorCode = 
            | "FPV.ERR_DIVISION_BY_ZERO"
            | "FPV.ERR_PRECISION_IS_ZERO"
            | "FPV.ERR_PRECISION_IS_NEGATIVE";

        export type Compatible<T1 extends bigint = 2n> = Fpv<T1> | bigint;

        export type Precision = bigint;

        export type Handler = {
            unwrap<T1 extends bigint>(value: Fpv.Compatible<T1>): bigint;
            lerp<T1 extends bigint = 2n>(x: Fpv.Compatible<T1>, y: Fpv.Compatible<T1>, ms: bigint): Fpv<T1>;
        };

        export const Handler: Handler = (() => {

            function lerp<T1 extends bigint = 2n>(x: Fpv.Compatible<T1>, y: Fpv.Compatible<T1>, ms: bigint) {

            }
        })();
    }


    export type Random = {
        between(min: bigint, max: bigint): bigint;
        between<T1 extends bigint>(min: Fpv.Compatible<T1>, max: Fpv.Compatible<T1>): Fpv<T1>;
    };

    export const Random: Random = (() => {
        /***/ {
            return { pull };
        }

        function pull(range0: bigint, range1: bigint): bigint;
        function pull<T1 extends bigint = 0n>(range0: Fpv.Compatible<T1>, range1: Fpv.Compatible<T1>, precision?: T1): Fpv<T1>;
        function pull<T1 extends bigint = 0n>(
            p0: Fpv.Compatible<T1> | bigint,
            p1: Fpv.Compatible<T1> | bigint,
            p2?: T1
        ): Fpv.Compatible<T1> | bigint {
            let range0: Fpv.Compatible<T1> = p0;
            let range1: Fpv.Compatible<T1> = p1;
            let rangeInt0: bigint = Fpv.Handler.unwrap(range0);
            let rangeInt1: bigint = Fpv.Handler.unwrap(range1);
            if (rangeInt0 > rangeInt1) [rangeInt0, rangeInt1] = [rangeInt1, rangeInt0];
            let range: bigint = rangeInt1 - rangeInt0 + 1n;
            let random: bigint = BigInt(crypto.getRandomValues(new Uint32Array(1))[0]);
            let scaled: bigint = random % range;
            return rangeInt0 + scaled;
        }
    })();
}