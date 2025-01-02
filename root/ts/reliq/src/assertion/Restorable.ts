import type { Function } from "@root";
import type { AsyncFunction } from "@root";
import { copy } from "@root";

export type Restorable<T> = {
    get(): T;
    mut(handler: Function<T, void>): void;
    mutAsync(handler: AsyncFunction<T, void>): Promise<void>;
};

export function Restorable<T>(_v: T): Restorable<T> {
    /** @constructor */ {
        return {
            get,
            mut,
            mutAsync
        };
    }

    function get(): T {
        return _v;
    }

    function mut(op: Function<T, void>): void {
        let snapshot: T = copy(_v);
        try {
            op(get());
        }
        catch (e) {
            _v = snapshot;
            throw e;
        }
    }

    async function mutAsync(op: AsyncFunction<T, void>): Promise<void> {
        let snapshot: T = copy(_v);
        try {
            await op(get());
        }
        catch (e) {
            _v = snapshot;
            throw e;
        }
    }
}