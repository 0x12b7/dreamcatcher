import type { Function } from "@root";
import { require } from "@root";

export function retry<T>(op: Function<void, T>, attempts: bigint, delay: number = 0): T {
    require(attempts > 0n, "ERR_NO_ATTEMPTS");
    let lastError: unknown;
    let i: bigint = 0n;
    while (i < attempts) {
        try {
            return op();
        }
        catch (e) {
            let lastAttempt: boolean = i === attempts - 1n;
            if (lastAttempt) {
                lastError = e
            }
            let delayed: boolean = delay > 0;
            if (delayed) {
                _wait(delay);
            }
        }
        i++;
    }
    throw lastError;
}

function _wait(ms: number) {
    let start: number = Date.now();
    while (Date.now() - start < ms) {}
}