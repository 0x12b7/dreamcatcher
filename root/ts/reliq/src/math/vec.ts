import { Fpv } from "@root";

export type Vec<T1 extends Fpv.Precision> = {
    x(): Fpv<T1>;
    y(): Fpv<T1>;
};

export function Vec<T1 extends Fpv.Precision>(_x: Fpv.Compatible<T1>, _y: Fpv.Compatible<T1>): Vec<T1> {
    { return { x, y }; }

    function x(): Fpv<T1> {
        return Fpv<T1>(Fpv.Handler.unwrap(_x)).expect("Vec: Failed to initialize `Fpv`.");
    }

    function y(): Fpv<T1> {
        return Fpv<T1>(Fpv.Handler.unwrap(_y)).expect("Vec: Failed to initialize `Fpv`.");
    }
}

export namespace Vec {
    export type Calculator = {
        distance<T1 extends Fpv.Precision>(from: Vec<T1>, to: Vec<T1>): Fpv.Result<Fpv<T1>>;
    };

    export const Calculator: Calculator = (() => {
        { return { }; }

        function distance<T1 extends Fpv.Precision>(from: Vec<T1>, to: Vec<T1>): Fpv.Result<Fpv<T1>> {
            let dx = to.x().sub(from.y());
            let dy = to.y().sub(from.y());
            return dx
                .mul(dx)
                .add(dy.mul(dy))
                .sqrt();
        }
    })();
}