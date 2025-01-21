import type { Option } from "@root";
import type { Function } from "@root";
import { None, Some, Vec } from "@root";

export type Table<T1, T2> = {
    keys(): Vec<T1>;
    values(): Vec<T2>;
    length(): bigint;
    at(key: T1): Option<T2>;
    has(key: T1): boolean;
    map(key: T1, task: Function<T2, T2>): Table<T1, T2>;
    map(task: Function<T2, T2>): Table<T1, T2>;
    map<T3>(task: Function<T2, T3>): Table<T1, T3>;
    del(key: T1): Table<T1, T2>;
    del(): Table<T1, T2>;
    forEach(task: Function<T2, void>): Table<T1, T2>;
};

export function Table<T1, T2>(): Table<T1, T2> {
    let _this: Table<T1, T2>;
    let _map: Map<T1, T2>;

    /** @constructor */ {
        _map = new Map<T1, T2>();
        _this = {
            keys,
            values,
            length,
            at,
            has,
            
        };
        return _this;
    }
    
    function keys(): Vec<T1> {
        return Vec(_map.keys().toArray());
    }

    function values(): Vec<T2> {
        return Vec(_map.values().toArray());
    }

    function length(): bigint {
        return BigInt(_map.size);
    }

    function at(key: T1): Option<T2> {
        let value: T2 | undefined = _map.get(key);
        if (value) return Some(value);
        return None;
    }

    function has(key: T1): boolean {
        return _map.has(key);
    }

    function lookUp(key: T1): Option<T2> {

    }

    function del(key: T1): Table<T1, T2> {
        _map.delete(key);
        return _this;
    }
}

let users: Table<string, number>;

users!
    .map("Hello", v => {
        
        return v;
    })
    .del();