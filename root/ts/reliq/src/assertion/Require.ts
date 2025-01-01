import { panic } from "@root";

export function require<T extends string>(condition: boolean, errcode: T): asserts condition {
    if (condition) {
        return;
    }
    panic(errcode);
}