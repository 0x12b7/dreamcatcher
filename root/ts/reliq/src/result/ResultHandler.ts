import type { Function } from "@root";
import type { AsyncFunction } from "@root";
import type { Result } from "@root";
import type { OkValOfAll } from "@root";
import type { ErrValOfAll } from "@root";
import { Ok } from "@root";
import { Err } from "@root";

export type ResultHandler = {
    isResult(unknown: unknown): unknown is Result<unknown, unknown>;
    isOk(unknown: unknown): unknown is Ok<unknown>;
    isErr(unknown: unknown): unknown is Err<unknown>;
    wrap<T, E = unknown>(op: Function<void, T>): Result<T, E>;
    wrapAsync<T, E = unknown>(op: AsyncFunction<void, T>): Promise<Result<T, E>>;
    unwrapAll<T extends Array<Result<unknown, unknown>>>(...wrappers: T): Result<OkValOfAll<T>, ErrValOfAll<T>[number]>;
    unwrapAny<T extends Array<Result<unknown, unknown>>>(...wrappers: T): Result<OkValOfAll<T>[number], ErrValOfAll<T>>;
};