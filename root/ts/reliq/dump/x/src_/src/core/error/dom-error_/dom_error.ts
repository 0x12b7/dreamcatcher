import { DomErrorCode } from "@root";
import { LegacyDomErrorCode } from "@root";
import { LegacyDomErrorName } from "@root";
import { DomErrorCodeToCodeMap } from "@root";
import { DomErrorNameToCodeMap } from "@root";
import { DomExceptionCodeComparisonMap } from "./dom_exception_code_camparison_map";
import { Error } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type LegacyDomErrorCode =
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

export type LegacyDomErrorName =
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

export const _DomExceptionCodeComparisonMap: Record<number, boolean> = {
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
    };


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

    function _isValidCode(e: DOMException): boolean {
        return DomExceptionCodeComparisonMap[e.code];
    }
}