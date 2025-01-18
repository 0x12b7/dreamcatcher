import {
    type Error
} from "@root";

export type NetworkErrorCode =
    | "NETWORK.ERR_TOOK_TOO_LONG_TO_RESPOND"
    | "NETWORK.ERR_INVALID_OR_UNREACHABLE_URL"
    | "NETWORK.ERR_TEMPORARILY_UNAVAILABLE_FOR_DNS_QUERIES"
    | "NETWORK.ERR_DOWN_OR_ACTIVELY_REJECTING_CONNECTION"
    | "NETWORK.ERR_CLOSED_ABRUPTLY"
    | "NETWORK.ERR_CONNECTION_COULD_NOT_BE_ESTABLISHED"
    | "NETWORK.ERR";


export type NetworkError =
    & Error<NetworkErrorCode>
    & {
    status: bigint;
    
};