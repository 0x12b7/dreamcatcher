import { LegacyDomErrorCode } from "@root";
import { DomErrorCode } from "@root"

export const DomErrorCodeToCodeMap: Record<LegacyDomErrorCode, DomErrorCode> = {
    1:   "DOM.ERR_INDEX_SIZE",
    3:   "DOM.ERR_HIERARCHY_REQUEST",
    4:   "DOM.ERR_WRONG_DOCUMENT",
    5:   "DOM.ERR_INVALID_CHARACTER",
    7:   "DOM.ERR_NO_MODIFICATION_ALLOWED",
    8:   "DOM.ERR_NOT_FOUND",
    9:   "DOM.ERR_NOT_SUPPORTED",
    11:  "DOM.ERR_INVALID_STATE",
    12:  "DOM.ERR_SYNTAX",
    13:  "DOM.ERR_INVALID_MODIFICATION",
    14:  "DOM.ERR_NAMESPACE",
    17:  "DOM.ERR_TYPE_MISMATCH",
    18:  "DOM.ERR_SECURITY",
    19:  "DOM.ERR_NETWORK",
    20:  "DOM.ERR_ABORT",
    21:  "DOM.ERR_URL_MISMATCH",
    22:  "DOM.ERR_QUOTA_EXCEEDED",
    23:  "DOM.ERR_TIMEOUT",
    24:  "DOM.ERR_INVALID_NODE_TYPE",
    25:  "DOM.ERR_DATA_CLONE"
};