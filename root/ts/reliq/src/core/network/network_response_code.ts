export type NetworkResponseCode =
    | "NETWORK.UNKNOWN"
    | "NETWORK.INFO_CONTINUE"
    | "NETWORK.INFO_SWITCHING_PROTOCOLS"
    | "NETWORK.INFO_PROCESSING"
    | "NETWORK.INFO_EARLY_HINTS"
    | "NETWORK.OK"
    | "NETWORK.OK_CREATED"
    | "NETWORK.OK_ACCEPTED"
    | "NETWORK.OK_NON_AUTHORITATIVE_INFORMATION"
    | "NETWORK.OK_NO_CONTENT"
    | "NETWORK.OK_RESET_CONTENT"
    | "NETWORK.OK_PARTIAL_CONTENT"
    | "NETWORK.OK_MULTI_STATUS"
    | "NETWORK.OK_ALREADY_REPORTED"
    | "NETWORK.OK_IM_USED"
    | "NETWORK.REDIRECT_MULTIPLE_CHOICES"
    | "NETWORK.REDIRECT_MOVED_PERMANENTLY"
    | "NETWORK.REDIRECT_FOUND"
    | "NETWORK.REDIRECT_SEE_OTHER"
    | "NETWORK.REDIRECT_NOT_MODIFIED"
    | "NETWORK.REDIRECT_USE_PROXY"
    | "NETWORK.REDIRECT"
    | "NETWORK.REDIRECT_TEMPORARY"
    | "NETWORK.REDIRECT_PERMANENT";