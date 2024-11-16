import type {Global} from "@silk";

export type AbsoluteUnit =
    | Global
    | number /// shorthand for pixels
    | `${number}px`
    | `${number}em`
    | `${number}rem`
    | `${number}pt`
    | `${number}cm`
    | `${number}mm`
    | `${number}in`
    | `${number}pc`
    | `${number}ch`;