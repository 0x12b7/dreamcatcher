import type { NetworkError } from "@root";
import { AxiosError } from "axios";
import { default as Axios } from "axios";
import { Error as Error0 } from "@root";
import { ErrorHandler } from "@root";
import { NetworkStatusCodeMap } from "@root";
import { Result } from "@root";
import { Option } from "@root";
import { Unsafe } from "@root";
import { wrapAsync } from "@root";
import { anyO } from "@root";

/**
 * ***Brief***
 * A lightweight utility for sending HTTP POST requests using Axios, with enhanced error handling.
 */
export async function post<T1 extends string, T2>(url: T1, payload?: T2): Promise<Result<Unsafe, NetworkError>> {
    return (await wrapAsync(async () => {
        return Unsafe((await Axios.post(url, payload)).data);
    })).mapErr(e => {
        let o0: Option<NetworkError> = e
            .parse((e): e is AxiosError => {
                return Axios.isAxiosError(e);
            })
            .map(e => {
                return Error0(NetworkStatusCodeMap[e.status ?? 999] || "NETWORK.ERR_UNKNOWN", e.message, BigInt(e.status ?? 999)) as NetworkError;
            });
        let o1: Option<NetworkError> = e
            .parse((e): e is Error => {
                return e instanceof Error;
            })
            .map(e => {
                return Error0({
                    code: "NETWORK.ERR_UNKNOWN",
                    message: e.message,
                    payload: 999n,
                    stack: ErrorHandler.parseStackTrace(Error().stack ?? "")
                });
            });
        return anyO(o0, o1)
            .toResult(undefined)
            .recover(() => {
                return Error0("NETWORK.ERR_UNKNOWN", undefined, 999n); 
            })
            .unlock();
    });
}