import { type Closure } from "@root";
import { type Wrapper } from "@root";

export namespace Ref {
    export type Task<T1> = Closure<[new: T1, old: T1], void>;
    
    export type DeletionTask = Closure<[], void>;
}

export type Ref<T1> = 
    & Wrapper<T1> 
    & {

    /**
     * ***Brief***
     * Mutates the internal value of the `Ref` instance.
     */
    mut(value: T1): Ref<T1>;

    /**
     * ***Brief***
     * Registers a callback that is invoked whenever the value changes.
     * 
     * ***Example***
     * ```ts
     *  let ref: Ref<bigint> = Ref(200n);
     *  ref.onChange(value => {
     *      /// ...
     *      return;
     *  });
     *  ref.mut(404n);
     * ```
     */
    onChange(task: Ref.Task<T1>): Ref.DeletionTask;
};

/**
 * ***Brief***
 * Wrapper that supports mutation and change tracking.
 */
export function Ref<T1>(_value: T1): Ref<T1> {
    let _this: Ref<T1>;
    let _count: bigint;
    let _taskMap: Map<bigint, Ref.Task<T1>>;

    /** @constructor */ {
        _count = 0n;
        _taskMap = new Map();
        return _this = { unwrap, mut, onChange };
    }

    function unwrap(): T1 {
        return _value;
    }

    function mut(value: T1): Ref<T1> {
        let oldValue: T1 = unwrap();
        let newValue: T1 = value;
        _value = value;
        _taskMap
            .values()
            .toArray()
            .forEach(task => {
                return task(newValue, oldValue);
            });
        return _this;
    }

    function onChange(task: Ref.Task<T1>): Ref.DeletionTask {
        let key: bigint = _newKey();
        _taskMap.set(key, task);
        return () => {
            _taskMap.delete(key);
            return;
        }
    }

    function _newKey(): bigint {
        return _count += 1n;
    }
}