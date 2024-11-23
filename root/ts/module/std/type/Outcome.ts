import type {Maybe} from "->std";

export type Outcome<T> = [e: Maybe<unknown>, x: Maybe<T>];