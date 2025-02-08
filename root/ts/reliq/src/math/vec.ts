import { INTERNAL_ERROR_MESSAGE } from "@root";
import { Fpv } from "@root";

export type Vec<T1 extends Fpv.Decimals> = {
    decimals(): T1;
    x(): Fpv<T1>;
    y(): Fpv<T1>;
    distanceFrom(origin: Vec<T1>): Fpv.Result<Fpv<T1>>;
};

export function Vec<T1 extends Fpv.Decimals, T2 extends T1 = T1>(_x: Fpv.Compatible<T1>, _y: Fpv.Compatible<T2>, _decimals: T1): Vec<T1> {
    /***/ {
        return {
            decimals,
            x,
            y,
            distanceFrom
        };
    }

    function decimals(): T1 {
        return _decimals;
    }

    function x(): Fpv<T1> {
        return Fpv(Fpv.Calculator.unwrap(_x), decimals()).expect(INTERNAL_ERROR_MESSAGE);
    }

    function y(): Fpv<T1> {
        return Fpv(Fpv.Calculator.unwrap(_y), decimals()).expect(INTERNAL_ERROR_MESSAGE);
    }

    function distanceFrom(origin: Vec<T1>): Fpv.Result<Fpv<T1>> {
        let dx: Fpv<T1> = origin.x().sub(x());
        let dy: Fpv<T1> = origin.y().sub(y());
        return dx
            .mul(dx)
            .add(dy.mul(dy))
            .sqrt();
    }
}

export namespace Vec {}