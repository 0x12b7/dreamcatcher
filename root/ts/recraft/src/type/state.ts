import {
    type SetStateAction,
    type Dispatch
} from "react";

export type State<T1> = [T1, Dispatch<SetStateAction<T1>>];