import type { NetworkErrorCode } from "@root";

export const NetworkStatusCodeMap: Record<number, NetworkErrorCode> = {
    400: "NETWORK.CLIENT_ERR_BAD_REQUEST",
    401: "NETWORK.CLIENT_ERR_UNAUTHORIZED",
    402: "NETWORK.CLIENT_ERR_PAYMENT_REQUIRED",
    403: "NETWORK.CLIENT_ERR_FORBIDDEN",
    404: "NETWORK.CLIENT_ERR_NOT_FOUND",
    405: "NETWORK.CLIENT_ERR_METHOD_NOT_ALLOWED",
    406: "NETWORK.CLIENT_ERR_NOT_ACCEPTABLE",
    407: "NETWORK.CLIENT_ERR_PROXY_AUTHENTICATION_REQUIRED",
    408: "NETWORK.CLIENT_ERR_REQUEST_TIMEOUT",
    409: "NETWORK.CLIENT_ERR_CONFLICT",
    410: "NETWORK.CLIENT_ERR_GONE",
    411: "NETWORK.CLIENT_ERR_LENGTH_REQUIRED",
    412: "NETWORK.CLIENT_ERR_PRECONDITION_FAILED",
    413: "NETWORK.CLIENT_ERR_CONTENT_TOO_LARGE",
    414: "NETWORK.CLIENT_ERR_URI_TOO_LONG",
    415: "NETWORK.CLIENT_ERR_UNSUPPORTED_MEDIA_TYPE",
    416: "NETWORK.CLIENT_ERR_RANGE_NOT_SATISFIABLE",
    417: "NETWORK.CLIENT_ERR_EXPECTATION_FAILED",
    418: "NETWORK.CLIENT_ERR_IM_A_TEAPOT",
    421: "NETWORK.CLIENT_ERR_MISDIRECT_REQUEST",
    422: "NETWORK.CLIENT_ERR_UNPROCESSABLE_CONTENT",
    423: "NETWORK.CLIENT_ERR_LOCKED",
    424: "NETWORK.CLIENT_ERR_FAILED_DEPENDENCY",
    425: "NETWORK.CLIENT_ERR_TOO_EARLY",
    426: "NETWORK.CLIENT_ERR_UPGRADE_REQUIRED",
    428: "NETWORK.CLIENT_ERR_PRECONDITION_REQUIRED",
    429: "NETWORK.CLIENT_ERR_TOO_MANY_REQUESTS",
    431: "NETWORK.CLIENT_ERR_REQUEST_HEADER_FIELDS_TOO_LARGE",
    451: "NETWORK.CLIENT_ERR_UNAVAILABLE_FOR_LEGAL_REASONS",
    500: "NETWORK.SERVER_ERR",
    501: "NETWORK.SERVER_ERR_NOT_IMPLEMENTED",
    502: "NETWORK.SERVER_ERR_BAD_GATEWAY",
    503: "NETWORK.SERVER_ERR_SERVICE_UNAVAILABLE",
    504: "NETWORK.SERVER_ERR_GATEWAY_TIMEOUT",
    505: "NETWORK.SERVER_ERR_HTTP_VERSION_NOT_SUPPORTED",
    506: "NETWORK.SERVER_ERR_VARIANT_ALSO_NEGOTIATES",
    507: "NETWORK.SERVER_ERR_INSUFFICIENT_STORAGE",
    508: "NETWORK.SERVER_ERR_LOOP_DETECTED",
    510: "NETWORK.SERVER_ERR_NOT_EXTENDED",
    511: "NETWORK.SERVER_ERR_AUTHENTICATION_REQUIRED"
}