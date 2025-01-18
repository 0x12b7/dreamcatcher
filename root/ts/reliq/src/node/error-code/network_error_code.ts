/// node:http
/// node:net

export type NetworkErrorCode =
    | "ECONNREFUSED"
    | "EECONNRESET"
    | "EADDRINUSE"
    | "EADDRNOTAVAIL"
    | "EAFNOSUPPORT"
    | "ENOTFOUND"
    | "EAI_AGAIN"
    | "ENETDOWN"
    | "EENETUNREACH"
    | "EHOSTUNREACH"
    | "ETIMEDOUT"
    | "EPROTO"
    | "ESPIPE"
    | "ECANCELED";