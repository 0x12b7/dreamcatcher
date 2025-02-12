import type { Data } from "../data/data";
import type { Selector } from "./selector";

export type SelectorHandler = {
    from(name: string, ...data: Array<Data>): Selector; 
};