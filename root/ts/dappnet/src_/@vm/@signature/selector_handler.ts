import type { Data } from "../data.s_mod/data";
import type { Selector } from "./selector";

export type SelectorHandler = {
    from(name: string, ...data: Array<Data>): Selector; 
};