type SuccessResponseCode =
    | "NETWORK.OK"
    | "NETWORK.OK_CREATED"
    | "NETWORK.OK_ACCEPTED"
    | "NETWORK.OK_NON_AUTHORITATIVE_INFORMATION"
    | "NETWORK.OK_NO_CONTENT"
    | "NETWORK.OK_RESET_CONTENT"
    | "NETWORK.OK_PARTIAL_CONTENT"
    | "NETWORK.OK_MULTI_STATUS"
    | "NETWORK.OK_ALREADY_REPORTED"
    | "NETWORK.OK_IM_USED";

export { type SuccessResponseCode };