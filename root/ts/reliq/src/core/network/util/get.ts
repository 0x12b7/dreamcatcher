import type { NetworkError } from "@root";
import type { NetworkErrorContext } from "@root";
import { AxiosError } from "axios";
import { default as Axios } from "axios";
import { Error as NativeError } from "@root";
import { NetworkStatusCodeMap } from "@root";
import { Result } from "@root";
import { Option } from "@root";
import { Unsafe } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { StackTrace } from "@root";
import { wrapAsync } from "@root";
import { anyO } from "@root";

export async function get(...[url, configuration]: Parameters<typeof Axios["get"]>): Promise<Result<Unsafe, NetworkError>> {
    return (await wrapAsync(async () => {
        return Unsafe((await Axios.get(url, configuration)).data);
    })).mapErr(unsafe => {
        let o0: Option<NetworkError> = unsafe
            .parse((unknown): unknown is AxiosError => {
                return Axios.isAxiosError(unknown);
            })
            .map(e => {
                return NativeError({
                    code: NetworkStatusCodeMap[e.status || 999] || "NETWORK.ERR_UNKNOWN",
                    message: Some(e.message),
                    payload: Some({
                        statusCode: BigInt(e.status || 999),
                    } as NetworkErrorContext),
                    stack: StackTrace(get)
                }) as NetworkError;
            });
        let o1: Option<NetworkError> = unsafe
            .parse((unknown): unknown is Error => {
                return unknown instanceof Error;
            })
            .map(e => {
                return NativeError({
                    code: "NETWORK.ERR_UNKNOWN",
                    message: Some(e.message),
                    payload: None,
                    stack: StackTrace(get)
                }) as NetworkError;
            });
        return anyO([o0, o1])
            .toResult(undefined)
            .recover(() => {
                return NativeError({
                    code: "NETWORK.ERR_UNKNOWN",
                    message: Some("Unable to make network request."),
                    payload: None,
                    stack: StackTrace(get)
                }) as NetworkError;
            })
            .unlock();
    });
}