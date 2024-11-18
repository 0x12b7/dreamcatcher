import type {Maybe} from "@seal";

export type Outcome<T> = [e: Maybe<unknown>, x: Maybe<T>];