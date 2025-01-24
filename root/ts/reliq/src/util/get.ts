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
 * Lightweight fetch utility built on Axios for making HTTP GET requests.
 */
export async function get<T1 extends string>(url: T1): Promise<Result<Unsafe, NetworkError>> {
    return (await wrapAsync(async () => {
        return Unsafe((await Axios.get(url)).data);
    })).mapErr(unsafe => {
        let o0: Option<NetworkError> = unsafe
            .parse((unknown): unknown is AxiosError => {
                return Axios.isAxiosError(unknown);
            })
            .map(e => {
                return Error0(NetworkStatusCodeMap[e.status ?? 999] || "NETWORK.ERR_UNKNOWN", e.message, BigInt(e.status ?? 999)) as NetworkError;
            });
        let o1: Option<NetworkError> = unsafe
            .parse((unknown): unknown is Error => {
                return unknown instanceof Error;
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