import type { Function } from "@root";
import type { AsyncFunction } from "@root";
import { clone } from "@root";

export type Restorable<T1> = {
    get(): T1;

    /**
     * @throws { DOMException }
     */
    mut(handler: Function<T1, void>): void;

    /**
     * 
     * @throws { DOMException }
     */
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
        let snapshot: T1 = clone(_v).unwrap();
        try {
            op(get());
        }
        catch (e) {
            _v = snapshot;
            throw e;
        }
    }

    async function mutAsync(op: AsyncFunction<T1, void>): Promise<void> {
        let snapshot: T1 = clone(_v).unwrap();
        try {
            await op(get());
        }
        catch (e) {
            _v = snapshot;
            throw e;
        }
    }
}