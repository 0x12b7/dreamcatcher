import { DomErrorCode } from "@root";
import { Error } from "@root";

// #region Dom Exception

export type DomExceptionName =
    | "EncodingError"
    | "NotReadableError"
    | "UnknownError"
    | "ConstraintError"
    | "DataError"
    | "TransactionInactiveError"
    | "ReadOnlyError"
    | "VersionError"
    | "OperationError"
    | "NotAllowedError";

export type DomExceptionCode =
    | 1
    | 3
    | 4
    | 5
    | 7
    | 8
    | 9
    | 11
    | 12
    | 13
    | 14
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25;

let x = {
    1: true,
    3: true,
    4: true,
    5: true,
    7: true,
    8: true,
    9: true,
    11: true,
    12: true,
    13: true,
    14: true,
    17: true,
    18: true,
    19: true,
    20: true,
    21: true,
    22: true,
    23: true,
    24: true,
    25: true
}[3]

export const DomErrorNameToCodeMap: Record<DomExceptionName, DomErrorCode> = {
    "EncodingError": "DOM.ERR_ENCODING",
    "NotReadableError": "DOM.ERR_NOT_READABLE",
    "UnknownError": "DOM.ERR_UNKNOWN",
    "ConstraintError": "DOM.ERR_CONSTRAINT",
    "DataError": "DOM.ERR_DATA",
    "TransactionInactiveError": "DOM.ERR_TRANSACTION_INACTIVE",
    "ReadOnlyError": "DOM.ERR_READ_ONLY",
    "VersionError": "DOM.ERR_VERSION",
    "OperationError": "DOM.ERR_OPERATION",
    "NotAllowedError": "DOM.ERR_NOT_ALLOWED"
};

// #region Dom Error

export type DomError = Error<DomErrorCode>;

export function DomError(): DomError;
export function DomError(e: DOMException): DomError;
export function DomError(_0?: DOMException): DomError {
    /** @constructor */ {
        if (!_0) return Error({
            code: "DOM.ERR_UNKNOWN",
            message: None,
            payload: None
        });
        return Error({
            code: _match(_0),
            message: (() => {
                if (_0.message.trim() === "") return None;
                return Some(_0.message);
            })(),
            payload: None
        });
    }

    function _match(e: DOMException): DomErrorCode {
        if (_isDomException[e.code])

        let match0: boolean = [
            1, 3, 4, 
            5, 7, 8, 
            9, 
            11, 12, 13, 
            14, 17, 18, 
            19, 20, 21, 
            22, 23, 24, 
            25
        ].includes(e.code);
        let match1: boolean = [
            "EncodingError",
            "NotReadableError",
            "UnknownError",
            "ConstraintError",
            "DataError",
            "TransactionInactiveError",
            "ReadOnlyError",
            "VersionError",
            "OperationError",
            "NotAllowedError"
        ].includes(e.name);
        if (match0) return DomErrorCodeToCodeMap[(e.code as LegacyDomErrorCode)];
        else if (match1) return DomErrorNameToCodeMap[(e.name as LegacyDomErrorName)];
        else return "DOM.ERR_UNKNOWN";
    }
}