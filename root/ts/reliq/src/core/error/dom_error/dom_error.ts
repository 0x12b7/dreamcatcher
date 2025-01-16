import {
    type DomErrorCode,
    Error,
    Some,
    None
} from "@root";

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