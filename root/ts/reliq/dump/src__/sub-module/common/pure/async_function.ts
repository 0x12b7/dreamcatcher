import { 
    type Function 
} from "@common";

export type AsyncFunction<T1, T2> = Function<T1, Promise<T2>>;