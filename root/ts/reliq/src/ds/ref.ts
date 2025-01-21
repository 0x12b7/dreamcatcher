import type { Closure } from "@root";
import { Vec } from "@root";

export type RefDelTask = Closure<[], void>;

export type RefTask<T1> = Closure<[new: T1, old: T1], void>;

export type Ref<T1> = {
    get(): T1;
    set(value: T1): Ref<T1>;
    onChange(task: RefTask<T1>): RefDelTask;
};

export function Ref<T1>(_value: T1): Ref<T1> {
    let _this: Ref<T1>;
    let _tasks: Vec<RefTask<T1>>;

    /** @constructor */ {
        _this = {
            get,
            set,
            onChange
        };
        _tasks = Vec([]);
        return _this;
    }

    function get(): T1 {
        return _value;
    }

    function set(value: T1): Ref<T1> {
        let oldValue: T1 = get();
        let newValue: T1 = value;
        _value = value;
        _tasks.forEach(task => {
            task(newValue, oldValue);
            return;
        });
        return _this;
    }

    function onChange(task: RefTask<T1>): RefDelTask {
        _tasks.push(task);
    }
}

let x: Ref<number>;

x!.onChange(n => {
    
});