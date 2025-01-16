import {
    require
} from "@error";

export function assert<T1 extends string>(condition: boolean, message: T1): asserts condition is true {
    return require(condition, message);
}