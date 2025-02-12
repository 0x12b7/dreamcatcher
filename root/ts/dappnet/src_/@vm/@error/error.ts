import type { ErrorCode } from "src_/@vm/@error/s_mod";
import type { Option } from "reliq";

export type Error = {
    code: ErrorCode;
    data: Option<unknown>;
    message: Option<unknown>;
    transaction: Option<unknown>;
    reason: Option<unknown>;
};