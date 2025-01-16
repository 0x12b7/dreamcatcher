import {
    type TypeGuard,
    type Option
} from "@root";

export type Parsable = {
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};