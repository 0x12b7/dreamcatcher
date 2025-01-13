import { LegacyDomErrorName } from "@root";
import { DomErrorCode } from "@root";

export const DomErrorNameToCodeMap: Record<LegacyDomErrorName, DomErrorCode> = {
    EncodingError:             "DOM.ERR_ENCODING",
    NotReadableError:          "DOM.ERR_NOT_READABLE",
    UnknownError:              "DOM.ERR_UNKNOWN",
    ConstraintError:           "DOM.ERR_CONSTRAINT",
    DataError:                 "DOM.ERR_DATA",
    TransactionInactiveError:  "DOM.ERR_TRANSACTION_INACTIVE",
    ReadOnlyError:             "DOM.ERR_READ_ONLY",
    VersionError:              "DOM.ERR_VERSION",
    OperationError:            "DOM.ERR_OPERATION",
    NotAllowedError:           "DOM.ERR_NOT_ALLOWED"
};