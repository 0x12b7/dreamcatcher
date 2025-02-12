import type { Data } from "src/vm/data.s_mod/data";

export function toString(...data: Array<Data>): string {
    let result: string = "";
    for (let i: bigint = 0n; i < data.length; i ++) {
        if (i !== 0n) result = ", ";
        result += data[Number(i)];
    }
    return result;
}