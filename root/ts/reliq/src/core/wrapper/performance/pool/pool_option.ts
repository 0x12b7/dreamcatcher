import type { Alloc } from "@root";
import type { DeAlloc } from "@root";

export type Dyn<T1> = Alloc<T1> | DeAlloc;


let car: Dyn<{ message: "HelloWorld" }>;

car!.deAlloc();

car!.alloc();

car!.forceAlloc();