import type { Function } from "@root";
import type { AsyncFunction } from "@root";
import { copy } from "@root";

export type Restorable<T1> = {
    get(): T1;
    mut(handler: Function<T1, void>): void;
    mutAsync(handler: AsyncFunction<T1, void>): Promise<void>;
};

export function Restorable<T1>(_v: T1): Restorable<T1> {
    /** @constructor */ {
        return {
            get,
            mut,
            mutAsync
        };
    }

    function get(): T1 {
        return _v;
    }

    function mut(op: Function<T1, void>): void {
        let snapshot: T1 = copy(_v);
        try {
            op(get());
        }
        catch (e) {
            _v = snapshot;
            throw e;
        }
    }

    async function mutAsync(op: AsyncFunction<T1, void>): Promise<void> {
        let snapshot: T1 = copy(_v);
        try {
            await op(get());
        }
        catch (e) {
            _v = snapshot;
            throw e;
        }
    }
}