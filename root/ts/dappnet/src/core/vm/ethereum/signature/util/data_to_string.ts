import type { Data } from "@core.vm.ethereum";

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