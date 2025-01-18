export type NetworkResponse = 
    | NetworkInformationResponse
    | NetworkRedirectionResponse
    | NetworkSuccessResponse;


export type NetworkInformationResponse = 
    | "NETWORK.INFO_CONTINUE"
    | "NETWORK.INFO_SWITCHING_PROTOCOLS"
    | "NETWORK.INFO_PROCESSING"
    | "NETWORK.INFO_EARLY_HINTS"

export type NetworkRedirectionResponse =
    | "NETWORK.REDIRECT_MULTIPLE_CHOICES"
    | "NETWORK.REDIRECT_MOVED_PERMANENTLY"
    | "NETWORK.REDIRECT_FOUND"
    | "NETWORK.REDIRECT_SEE_OTHER"
    | "NETWORK.REDIRECT_NOT_MODIFIED"
    | "NETWORK.REDIRECT_USE_PROXY"
    | "NETWORK.REDIRECT_SWITCH_PROXY"
    | "NETWORK.REDIRECT_TEMPORARY"
    | "NETWORK.REDIRECT_PERMANENT";

export type NetworkSuccessResponse =
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

export type NetworkClientErrorCode =
    | "NETWORK.ERR_BAD_REQUEST"
    | "NETWORK.ERR_UNAUTHORIZED"
    | "NETWORK.ERR_PAYMENT_REQUIRED"
    | "NETWORK.ERR_FORBIDDEN"
    | "NETWORK.ERR_NOT_FOUND"
    | "NETWORK.ERR_METHOD_NOT_ALLOWED"
    | "NETWORK.ERR_NOT_ACCEPTABLE"
    | "NETWORK.ERR_PROXY_AUTHENTICATION_REQUIRED"
    | "NETWORK.ERR_REQUEST_TIMEOUT"
    | "NETWORK.ERR_CONFLICT"
    | "NETWORK.ERR_GONE"
    | "NETWORK.ERR_LENGTH_REQUIRED"
    | "NETWORK.ERR_PRECONDITION_FAILED"
    | "NETWORK.ERR_PAYLOAD_TOO_LARGE"
    | "NETWORK.ERR_URI_TOO_LONG"
    | "NETWORK.ERR_UNSUPPORTED_MEDIA_TYPE"
    | "NETWORK.ERR_RANGE_NOT_SATISFIABLEE"
    | "NETWORK.ERR_EXPECTATION_FAILED"
    | "NETWORK.ERR_IM_A_TEAPOT"
    | "NETWORK.ERR_MISDIRECTED_REQUEST"
    | "NETWORK.ERR_UNPROCESSABLE_CONTENT"
    | "NETWORK.ERR_LOCKED"
    | "NETWORK.ERR_FAILED_DEPENDENCY"
    | "NETWORK.ERR_TOO_EARLY"
    | "NETWORK.ERR_UPGRADE_REQUIRED"
    | "NETWORK.ERR_PRECONDITION_REQUIRED"
    | "NETWORK.ERR_TOO_MANY_REQUESTS"
    | "NETWORK.ERR_REQUEST_HEADER_FIELDS_TOO_LARGE"
    | "NETWORK.ERR_UNAVAILABLE_FOR_LEGAL_REASONS";

export type ServerError =
    | "NETWORK.ERR_INTERNAL_SERVER"
    | "NETWORK.ERR_NOT_IMPLEMENTED"
    | "NETWORK.ERR_BAD_GATEWAY"
    | "NETWORK.ERR_SERVICE_UNAVAILABLE"
    | "NETWORK.ERR_HTTP_VERSION_NOT_SUPPORTED"
    | "NETWORK.ERR_VARIANT_ALSO_NEGOTIATES"
    | "NETWORK.ERR_INSUFFICIENT_STORAGE"
    | "NETWORK.ERR_LOOP_DETECTED"
    | "NETWORK.ERR_NOT_EXTENDED"
    | "NETWORK.ERR_AUTHENTICATION_REQUIRED";




export type NetworkInformationStatusCode =
    | 100
    | 101
    | 102
    | 103;



export type NetworkErrorCode =
    | 100
    | 101
    | 102
    | 103

    | 200
    | 201
    | 202
    | 203
    | 204
    | 205
    | 206
    | 207
    | 208
    | 226

    | 300
    | 301
    | 302
    | 303
    | 304
    | 305
    | 306
    | 307
    | 308

    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | 406
    | 407
    | 408
    | 409
    | 410
    | 411
    | 412
    | 413
    | 414
    | 415
    | 416
    | 417
    | 418
    | 421
    | 422
    | 423
    | 424
    | 425
    | 426
    | 428
    | 429
    | 431;

export type NetworkErrorCodeMap = Record<NetworkErrorCode, NetworkResponse>

export type NetworError = {
    rawCode: string;
    code: NetworkErrorCode;
};


export type NetworkResponseIntepreter = {
    
};

export function NetworkResponseIntepreter() {

}