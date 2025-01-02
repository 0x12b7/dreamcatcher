import type { Function } from "@root";
import type { AsyncFunction } from "@root";
import { copy } from "@root";

export type RestorableOperation<T> = Function<T, void>;
export type RestorableAsyncOperation<T> = AsyncFunction<T, void>;

export type Restorable<T> = {
    get(): T;
    mut(handler: RestorableOperation<T>): void;
    mutAsync(handler: RestorableAsyncOperation<T>): Promise<void>;
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

    function mut(op: RestorableOperation<T>): void {
        let snapshot: T = copy(_v);
        try {
            op(get());
        }
        catch (e) {
            _v = snapshot;
            throw e;
        }
    }

    async function mutAsync(op: RestorableAsyncOperation<T>): Promise<void> {
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