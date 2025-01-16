import { 
    type SignedIntegerLike,
    type UnsignedIntegerLike,
    type Float
} from "@root";

export type Numeric =
    | Float
    | number
    | bigint
    | SignedIntegerLike
    | UnsignedIntegerLike;