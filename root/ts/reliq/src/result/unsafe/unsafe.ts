export type Unsafe<T1 = unknown> = {
    unwrap(): T1;
};

export function Unsafe<T1 = unknown>(_v: T1): Unsafe<T1> {
    /** @constructor */ {
        return { unwrap };
    }

    function unwrap(): T1 {
        return _v;
    }
}