import { Option } from "@root";

export type Span<T1> = {
    length(): bigint;
    at(k: bigint): Option<T1>;
};