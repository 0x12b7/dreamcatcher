import { Error } from "@root";

export type DomError = Error<DomError.Code>;

export function DomError(): DomError;
export function DomError(_legacy: DOMException): DomError;
export function DomError(
    _p0?: DOMException
): DomError {
    {
        let e: DOMException | undefined = _p0;
        if (e) return Error(_match(e), e.message);
        return Error("DOM.ERR_UNKNOWN");
    }

    function _match(e: DOMException): DomError.Code {
        let code: DomError.Code = "DOM.ERR_UNKNOWN";
        if (
            e.code === 1
            || e.code === 3
            || e.code === 4
            || e.code === 5
            || e.code === 7
            || e.code === 8
            || e.code === 9
            || e.code === 11
            || e.code === 12
            || e.code === 13
            || e.code === 14
            || e.code === 17
            || e.code === 18
            || e.code === 19
            || e.code === 20
            || e.code === 21
            || e.code === 22
            || e.code === 23
            || e.code === 24
            || e.code === 25
        ) code = DomError.Exception.CodeRemap[e.code];
        else if (
            e.name === "EncodingError"
            || e.name === "NotReadableError"
            || e.name === "UnknownError"
            || e.name === "ConstraintError"
            || e.name === "DataError"
            || e.name === "TransactionInactiveError"
            || e.name === "ReadOnlyError"
            || e.name === "VersionError"
            || e.name === "OperationError"
            || e.name === "NotAllowedError"
        ) code = DomError.Exception.NameRemap[e.name];
        return code;
    }
}

export namespace DomError {
    export type Code =
        | "DOM.ERR_INDEX_SIZE"
        | "DOM.ERR_HIERARCHY_REQUEST"
        | "DOM.ERR_WRONG_DOCUMENT"
        | "DOM.ERR_INVALID_CHARACTER"
        | "DOM.ERR_NO_MODIFICATION_ALLOWED"
        | "DOM.ERR_NOT_FOUND"
        | "DOM.ERR_NOT_SUPPORTED"
        | "DOM.ERR_INVALID_STATE"
        | "DOM.ERR_ATTRIBUTE_IN_USE"
        | "DOM.ERR_SYNTAX"
        | "DOM.ERR_INVALID_MODIFICATION"
        | "DOM.ERR_NAMESPACE"
        | "DOM.ERR_INVALID_ACCESS"
        | "DOM.ERR_TYPE_MISMATCH"
        | "DOM.ERR_SECURITY"
        | "DOM.ERR_NETWORK"
        | "DOM.ERR_ABORT"
        | "DOM.ERR_URL_MISMATCH"
        | "DOM.ERR_QUOTA_EXCEEDED"
        | "DOM.ERR_TIMEOUT"
        | "DOM.ERR_INVALID_NODE_TYPE"
        | "DOM.ERR_DATA_CLONE"
        | "DOM.ERR_ENCODING"
        | "DOM.ERR_NOT_READABLE"
        | "DOM.ERR_UNKNOWN"
        | "DOM.ERR_CONSTRAINT"
        | "DOM.ERR_DATA"
        | "DOM.ERR_TRANSACTION_INACTIVE"
        | "DOM.ERR_READ_ONLY"
        | "DOM.ERR_VERSION"
        | "DOM.ERR_OPERATION"
        | "DOM.ERR_NOT_ALLOWED";

    export namespace Exception {
        export const NameRemap: Record<Name, DomError.Code> = {
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

        export const CodeRemap: Record<Code, DomError.Code> = {
            1: "DOM.ERR_INDEX_SIZE",
            3: "DOM.ERR_HIERARCHY_REQUEST",
            4: "DOM.ERR_WRONG_DOCUMENT",
            5: "DOM.ERR_INVALID_CHARACTER",
            7: "DOM.ERR_NO_MODIFICATION_ALLOWED",
            8: "DOM.ERR_NOT_FOUND",
            9: "DOM.ERR_NOT_SUPPORTED",
            11: "DOM.ERR_INVALID_STATE",
            12: "DOM.ERR_SYNTAX",
            13: "DOM.ERR_INVALID_MODIFICATION",
            14: "DOM.ERR_NAMESPACE",
            17: "DOM.ERR_TYPE_MISMATCH",
            18: "DOM.ERR_SECURITY",
            19: "DOM.ERR_NETWORK",
            20: "DOM.ERR_ABORT",
            21: "DOM.ERR_URL_MISMATCH",
            22: "DOM.ERR_QUOTA_EXCEEDED",
            23: "DOM.ERR_TIMEOUT",
            24: "DOM.ERR_INVALID_NODE_TYPE",
            25: "DOM.ERR_DATA_CLONE"
        };

        export type Name =
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

        export type Code =
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
    }
}