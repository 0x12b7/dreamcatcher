import type {
    Option
} from "@core";

export type Error<T1 extends string, T2 = unknown> = {
    code: T1;
    message: Option<string>;
    payload: Option<T2>;
};

export function Error<T1 extends string, T2 = unknown>(_this: Error<T1, T2>): Error<T1, T2> {
    /** @constructor */ {
        return _this;
    }
}