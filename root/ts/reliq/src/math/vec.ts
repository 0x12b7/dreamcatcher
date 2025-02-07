import { Fpv } from "@root";

export type Vec<T1 extends Fpv.Precision> = {
    x(): Fpv<T1>;
    y(): Fpv<T1>;
    distance(to: Vec<T1>): Fpv.Result<Fpv<T1>>;
};

export function Vec<T1 extends Fpv.Precision, T2 extends T1 = T1>(_x: Fpv.Compatible<T1>, _y: Fpv.Compatible<T2>): Vec<T1> {
    {
        return { x, y, distance };
    }

    function x(): Fpv<T1> {
        return Fpv<T1>(Fpv.Calculator.unwrap(_x)).expect("Vec: Failed to initialize `Fpv`.");
    }

    function y(): Fpv<T1> {
        return Fpv<T1>(Fpv.Calculator.unwrap(_y)).expect("Vec: Failed to initialize `Fpv`.");
    }

    function distance(to: Vec<T1>): Fpv.Result<Fpv<T1>> {
        let dx: Fpv<T1> = to.x().sub(y());
        let dy: Fpv<T1> = to.y().sub(y());
        return dx
            .mul(dx)
            .add(dy.mul(dy))
            .sqrt();
    }
}

export namespace Vec {}