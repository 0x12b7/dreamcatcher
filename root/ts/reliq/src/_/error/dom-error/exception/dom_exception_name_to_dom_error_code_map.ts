import type { DomExceptionName } from "@root";
import type { DomErrorCode } from "@root";

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