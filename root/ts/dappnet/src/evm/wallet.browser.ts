import { BrowserProvider } from "ethers";
import { Result } from "reliq";
import { Option } from "reliq";

type Result$0<T1, T2> = Result<T1, T2>;

export type Wallet = {
    
}

export function Wallet() {
    let _socket: BrowserProvider;

    /***/ {

    }


}

export namespace Wallet {
    export type Result<T1> = Result$0<T1, Error>;

    export type Error = {
        code: ErrorCode;
        data: Option<unknown>;
        message: Option<unknown>;
        transaction: Option<unknown>;
        reason: Option<unknown>;
    };

    export type ErrorCode =
        | "EVM.ERR_MALFORMED_SIGNATURE"

        /// Generic
        | "EVM.ERR_UNKNOWN"
        | "EVM.ERR_NOT_IMPLEMENTED"
        | "EVM.ERR_UNSUPPORTED_OPERATION"
        | "EVM.ERR_NETWORK_FAULT"
        | "EVM.ERR_SERVER_FAULT"
        | "EVM.ERR_TIMEOUT"
        | "EVM.ERR_BAD_DATA"
        | "EVM.ERR_CANCELLED"
        | "EVM.ERR_INVALID_RESPONSE"

        /// Operational
        | "EVM.ERR_BUFFER_OVERRUN"
        | "EVM.ERR_NUMERIC_FAULT"

        /// Argument
        | "EVM.ERR_INVALID_ARGUMENT"
        | "EVM.ERR_MISSING_ARGUMENT"
        | "EVM.ERR_UNEXPECTED_ARGUMENT"

        /// Blockchain
        | "EVM.ERR_CALL_EXCEPTION"
        | "EVM.ERR_INSUFFICIENT_FUNDS"
        | "EVM.ERR_NONCE_EXPIRED"
        | "EVM.ERR_REPLACEMENT_UNDERPRICED"
        | "EVM.ERR_TRANSACTION_REPLACED"
        | "EVM.ERR_UNCONFIGURED_NAME"
        | "EVM.ERR_OFFCHAIN_FAULT"

        /// User Interaction
        | "EVM.ERR_ACTION_REJECTED";
}