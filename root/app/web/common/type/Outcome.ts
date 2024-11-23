import type {Maybe} from "->common";

export type Outcome<T> = [e: Maybe<unknown>, x: Maybe<T>];