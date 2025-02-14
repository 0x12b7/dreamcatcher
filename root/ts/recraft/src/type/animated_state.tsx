import {
    type SpringRef,
    type Lookup
} from "react-spring";

export type AnimatedState<T1> = [T1, SpringRef<Lookup<T1>>];