import {
    type Closure,
    type Option
} from "@root";

export type Searchable<T1> = {
    has(value: T1): boolean;
    lookup(operation: Closure<[value: T1, position: bigint], boolean>): Option<T1>;
};