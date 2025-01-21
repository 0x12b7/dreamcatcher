import type { DomErrorCode } from "@root";
import { DomExceptionCodeToDomErrorCodeMap } from "@root";
import { DomErrorNameToCodeMap } from "@root";
import { Error } from "@root";

export type DomError = Error<DomErrorCode>;

/**
 * ***Brief***
 * A domain-specific error that provides the error code for DOM exceptions.
 */
export function DomError(): DomError;
export function DomError(_e: DOMException): DomError;
export function DomError(
    _args0?: DOMException
): DomError {
    /** @constructor */ {
        let e: DOMException | undefined = _args0;
        if (e === undefined) return Error("DOM.ERR_UNKNOWN");
        return Error(_match(e), e.message);
    }

    function _match(e: DOMException): DomErrorCode {
        let code: DomErrorCode = "DOM.ERR_UNKNOWN";
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
        ) code = DomExceptionCodeToDomErrorCodeMap[e.code];
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
        ) code = DomErrorNameToCodeMap[e.name];
        return code;
    }
}