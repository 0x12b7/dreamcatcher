import { Option, Result } from 'reliq';

type Result$0<T1, T2> = Result<T1, T2>;
type Wallet = {};
declare function Wallet(): void;
declare namespace Wallet {
    type Result<T1> = Result$0<T1, Error>;
    type Error = {
        code: ErrorCode;
        data: Option<unknown>;
        message: Option<unknown>;
        transaction: Option<unknown>;
        reason: Option<unknown>;
    };
    type ErrorCode = "EVM.ERR_MALFORMED_SIGNATURE" | "EVM.ERR_UNKNOWN" | "EVM.ERR_NOT_IMPLEMENTED" | "EVM.ERR_UNSUPPORTED_OPERATION" | "EVM.ERR_NETWORK_FAULT" | "EVM.ERR_SERVER_FAULT" | "EVM.ERR_TIMEOUT" | "EVM.ERR_BAD_DATA" | "EVM.ERR_CANCELLED" | "EVM.ERR_INVALID_RESPONSE" | "EVM.ERR_BUFFER_OVERRUN" | "EVM.ERR_NUMERIC_FAULT" | "EVM.ERR_INVALID_ARGUMENT" | "EVM.ERR_MISSING_ARGUMENT" | "EVM.ERR_UNEXPECTED_ARGUMENT" | "EVM.ERR_CALL_EXCEPTION" | "EVM.ERR_INSUFFICIENT_FUNDS" | "EVM.ERR_NONCE_EXPIRED" | "EVM.ERR_REPLACEMENT_UNDERPRICED" | "EVM.ERR_TRANSACTION_REPLACED" | "EVM.ERR_UNCONFIGURED_NAME" | "EVM.ERR_OFFCHAIN_FAULT" | "EVM.ERR_ACTION_REJECTED";
}

export { Wallet };
