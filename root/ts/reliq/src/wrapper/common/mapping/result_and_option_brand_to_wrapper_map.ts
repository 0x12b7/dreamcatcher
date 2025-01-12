import type { Result } from "@root";
import type { Option } from "@root";
import type { Some } from "@root";
import type { None } from "@root";
import type { Ok } from "@root";
import type { Err } from "@root";
import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { ValidatedWrapper } from "@root";
import type { FallbackWrapper } from "@root";
import type { Displayable } from "@root";
import type { Function } from "@root";

export type ResultAndOptionBrandToWrapperMap<T1 extends "Some" | "None" | "Ok" | "Err", T2> =
    T1 extends "Some"    ? _Some<T2>     :
    T1 extends "None"    ? _None         :
    T1 extends "Ok"      ? _Ok<T2>       :
    T1 extends "Err"     ? _Err<T2>      :
    never;

type _Some<T1> =
    & Branded<"Some">
    & Wrapper<T1>
    & ValidatedWrapper<T1>
    & Displayable
    & {
    some(): this is Some<T1>;
    none(): this is None;
    value(): T1;
    expect(__: unknown): T1;
    unwrapOr(__: unknown): T1;
    and<T2>(op: Function<T1, Option<T2>>): Option<T2>;
    map<T2>(op: Function<T1, T2>): Some<T2>;
    toResult(__: unknown): Ok<T1>;
};

type _None = 
    & Branded<"None">
    & Wrapper<never>
    & FallbackWrapper<never>
    & Displayable
    & {
    some(): this is Some<unknown>;
    none(): this is None;
    expect(message: string): never;
    and(__: unknown): None;
    map(__: unknown): None;
    toResult<T1>(e: T1): Err<T1>;
};

type _Ok<T1> =
    & Branded<"Ok">
    & Wrapper<T1>
    & ValidatedWrapper<T1>
    & Displayable
    & {
    ok(): this is Ok<T1>;
    err(): this is Err<unknown>;
    val(): T1;
    expect(__: unknown): T1;
    expectErr(message: string): never;
    unwrapOr(__: unknown): T1;
    and<T2>(operation: Function<T1, Ok<T2>>): Ok<T2>;
    and<T2>(operation: Function<T1, Err<T2>>): Result<T1, T2>;
    and<T2, T3>(operation: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    map<T2>(operation: Function<T1, T2>): Ok<T2>;
    mapErr(__: unknown): Ok<T1>;
    toOption(): Option<T1>;
};

type _Err<T1> =
    & Branded<"Err">
    & Wrapper<T1>
    & FallbackWrapper<T1>
    & Displayable
    & {
    ok(): this is Ok<unknown>;
    err(): this is Err<T1>;
    val(): T1;
    stack(): string;
    expect(message: string): never;
    expectErr(__: unknown): T1;
    and(__: unknown): Err<T1>;
    map(__: unknown): Err<T1>;
    mapErr<T2>(operation: Function<T1, T2>): Err<T2>;
    toOption(): Option<never>;
};