import * as Reliq from "@root";

type UnsignedIntegerLike =
    | Reliq.U8
    | Reliq.U16
    | Reliq.U32
    | Reliq.U64
    | Reliq.U128
    | Reliq.U256
    | Reliq.U;

export type { UnsignedIntegerLike };