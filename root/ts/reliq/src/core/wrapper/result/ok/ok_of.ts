import {
    type Result,
    Ok
} from "@root";

export type OkOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? Ok<T2> : never;