import type { DomErrorCode } from "@root";
import type { LegacyDomErrorCode } from "@root";
import type { LegacyDomErrorName } from "@root";
import { DomErrorCodeToCodeMap } from "@root";
import { DomErrorNameToCodeMap } from "@root";
import { Error } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type DomError = Error<DomErrorCode>;

export function DomError(): DomError;
export function DomError(e: DOMException): DomError;
export function DomError(_0?: DOMException): DomError {
    /** @constructor */ {
        if (_0) {
            let match: boolean = false;
            let code: DomErrorCode = "DOM.ERR_UNKNOWN";
            match =
                _0.code === 1
                || _0.code === 3
                || _0.code === 4
                || _0.code === 5
                || _0.code === 7
                || _0.code === 8
                || _0.code === 9
                || _0.code === 11
                || _0.code === 12
                || _0.code === 13
                || _0.code === 14
                || _0.code === 17
                || _0.code === 18
                || _0.code === 19
                || _0.code === 20
                || _0.code === 21
                || _0.code === 22
                || _0.code === 23
                || _0.code === 24
                || _0.code === 25;
            if (match) code = DomErrorCodeToCodeMap[(_0.code as LegacyDomErrorCode)];
            match =
                _0.name === "EncodingError"
                || _0.name === "NotReadableError"
                || _0.name === "UnknownError"
                || _0.name === "ConstraintError"
                || _0.name === "DataError"
                || _0.name === "TransactionInactiveError"
                || _0.name === "ReadOnlyError"
                || _0.name === "VersionError"
                || _0.name === "OperationError"
                || _0.name === "NotAllowedError";
            if (match) code = DomErrorNameToCodeMap[(_0.name as LegacyDomErrorName)];
            return Error({ 
                code,
                message: _0.message.trim() !== "" ? Some(_0.message) : None,
                payload: None
            });
        }
        return Error({
            code: "DOM.ERR_UNKNOWN",
            message: None,
            payload: None
        });
    }
}