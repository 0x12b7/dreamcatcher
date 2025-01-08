import type { AsyncClosure } from "@root";
import type { Closure } from "@root";
import type { Option } from "@root";
import type { SomeValOfAll } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type OptionHandler = {
    match(unknown: unknown): unknown is Option<unknown>;
    some(unknown: unknown): unknown is Some<unknown>;
    none(unknown: unknown): unknown is None;
    all<T1 extends Array<Option<unknown>>>(...wrappers: T1): Option<SomeValOfAll<T1>>;
    any<T1 extends Array<Option<unknown>>>(...wrappers: T1): Option<SomeValOfAll<T1>[number]>;
    wrap<T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ... args: T3): Option<T1>;
    wrapAsync<T1, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ... args: T3): Promise<Option<T1>>;
};