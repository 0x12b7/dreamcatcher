import {
    type Branded
} from "@root";

export type Float = 
    & Branded<"Float">
    & {
    eq(value: Float): boolean;
    lt(value: Float): boolean;
    gt(value: Float): boolean;
    lteq(value: Float): boolean;
    gteq(value: Float): boolean;
    
};