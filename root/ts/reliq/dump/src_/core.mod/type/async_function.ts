import { 
    type Function 
} from "src/core.mod/mod";

export type AsyncFunction<T1, T2> = Function<T1, Promise<T2>>;