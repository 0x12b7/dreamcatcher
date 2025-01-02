import type { AsyncFunction } from "@root";
import { require } from "@root";

export async function retryAsync<T>(op: AsyncFunction<void, T>, attempts: bigint, delay: number): Promise<T> {
    require(attempts > 0n, "ERR_NO_ATTEMPTS");
    let lastError: unknown;
    let i: bigint = 0n;
    while (i < attempts) {
        try {
            return await op();
        }
        catch (e) {
            let lastAttempt: boolean = i === attempts - 1n;
            if (lastAttempt) {
                lastError = e;
            }
            let delayed: boolean = delay > 0;
            if (delayed) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        i++;
    }
    throw lastError;
}