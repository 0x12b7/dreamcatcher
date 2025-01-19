import { type SignedIntegerGrid } from "@root"
import { type UnsignedIntegerGrid } from "@root"

export type NumericBrand =
    | "Number"
    | "Bigint"
    | "Float"
    | SignedIntegerGrid[keyof SignedIntegerGrid][0]
    | UnsignedIntegerGrid[keyof UnsignedIntegerGrid][0]