import type { Closure } from "@root";
import type { AsyncClosure } from "@root";
import type { Result } from "@root";
import type { OkValOfAll } from "@root";
import type { ErrValOfAll } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Unsafe } from "@root";

export type ResultHandler = {
    match(unknown: unknown): unknown is Result<unknown, unknown>;
    ok(unknown: unknown): unknown is Ok<unknown>;
    err(unknown: unknown): unknown is Err<unknown>;
    all<T1 extends Array<Result<unknown, unknown>>>(... wrappers: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
    any<T1 extends Array<Result<unknown, unknown>>>(... wrappers: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
    wrap<T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ... args: T3): Result<T1, Unsafe<unknown>>;
    wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ... args: T3): Promise<Result<Awaited<T1>, Unsafe<unknown>>>;
};