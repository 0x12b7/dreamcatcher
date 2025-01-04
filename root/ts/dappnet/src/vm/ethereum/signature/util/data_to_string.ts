import type { Data } from "src/vm/ethereum/mod";

export function dataToString(... args: Array<Data>): string {
    let result: string = "";
    let i: bigint = 0n;
    while (i < args.length) {
        if (i !== 0n) result = ", ";
        result += args[Number(i)];
        i++;
    }
    return result;
}