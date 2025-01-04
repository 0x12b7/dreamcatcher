import type { SetStateAction } from "react";
import type { Dispatch } from "react";

export type State<T1> = [T1, Dispatch<SetStateAction<T1>>];