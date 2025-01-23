export function isNetworkErrorStatusCode(statusCode: bigint): boolean {
    return statusCode >= 400n;
}