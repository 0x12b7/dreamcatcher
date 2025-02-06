import type { Result as Result$0 } from "@root";
import type { Wrapper } from "@root";
import type { Closure } from "@root";
import { INTERNAL_ERROR_MESSAGE } from "@root";
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
    cst<T2 extends Fpv.Precision>(precision: T2): Fpv<T2>;
};

export function Fpv<T1 extends bigint = 2n>(_value: Fpv.Compatible<T1>, _precision: T1 = (2n as any)): Fpv.Result<Fpv<T1>> {
    {
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
            div,
            sqrt,
            lerp
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

    function cst<T2 extends Fpv.Precision>(precision: T2): Fpv<T2> {
        
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
        | "FPV.ERR_PRECISION_IS_ZERO"
        | "FPV.ERR_PRECISION_IS_NEGATIVE"
        | "FPV.ERR_CANNOT_SQUARE_NAGATIVE";

    export type Compatible<T1 extends bigint = 2n> = Fpv<T1> | bigint;

    export type Precision = bigint;

    export type Handler = {
        unwrap<T1 extends bigint>(value: Fpv.Compatible<T1>): bigint;
    };

    export const Handler: Handler = (() => {
        {
            return { unwrap };
        }

        function unwrap<T1 extends bigint>(value: Fpv.Compatible<T1>): bigint {
            if (typeof value === "bigint") return value;
            return value.unwrap();
        }
    })();
}