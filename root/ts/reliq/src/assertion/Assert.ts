import { require } from "@root";

export function assert<T extends string>(condition: boolean, errcode: T): asserts condition {
    return require(condition, errcode);
}