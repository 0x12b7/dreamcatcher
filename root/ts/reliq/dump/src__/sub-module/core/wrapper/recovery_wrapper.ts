import {
    type Wrapper
} from "@core";

export type RecoveryWrapper<T1> =
    & Wrapper<T1>
    & {
    unwrapOr<T2>(fallback: T2): T2;
};