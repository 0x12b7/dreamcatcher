export type Unsafe<T = unknown> = {
    unwrap(): T;
};

export function Unsafe<T = unknown>(_v: T): Unsafe<T> {
    /** @constructor */ {
        return { unwrap };
    }

    function unwrap(): T {
        return _v;
    }
}