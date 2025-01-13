import type { Option } from "@root";

type Error<T1 extends string, T2 extends Array<unknown> = []> = {
    code: T1;
    message: Option<string>;
    payload: Option<T2>;
};

function Error<T1 extends string, T2 extends Array<unknown> = []>(_this: Error<T1, T2>): Error<T1, T2> {
    /** @constructor */ {
        return _this;
    }
}

export { Error };