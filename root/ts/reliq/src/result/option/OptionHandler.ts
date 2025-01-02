import type { Option } from "@root";
import type { Function } from "@root";
import type { AsyncFunction } from "@root";
import type { SomeValOfAll } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type OptionHandler = {
    isOption(unknown: unknown): unknown is Option<unknown>;
    isSome(unknown: unknown): unknown is Some<unknown>;
    isNone(unknown: unknown): unknown is None;
    wrap<T>(op: Function<void, T>): Option<T>;
    wrapAsync<T>(op: AsyncFunction<void, T>): Promise<Option<T>>;
    unwrapAll<T extends Array<Option<unknown>>>(...wrappers: T): Option<SomeValOfAll<T>>;
    unwrapAny<T extends Array<Option<unknown>>>(...wrappers: T): Option<SomeValOfAll<T>[number]>;
};