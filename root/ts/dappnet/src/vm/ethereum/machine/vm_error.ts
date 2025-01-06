import type { VmErrorCode } from "@core.vm.ethereum";
import { Option } from "reliq";

export type VmError = {
    code: VmErrorCode;
    data: Option<unknown>;
    message: Option<unknown>;
    transaction: Option<unknown>;
    reason: Option<unknown>;
};

export function VmError(_instance: VmError): VmError {
    /** @constructor */ {
        return _instance;
    }
}