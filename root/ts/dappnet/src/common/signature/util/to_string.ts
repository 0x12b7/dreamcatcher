import type { Data } from "../../data/data";

export function toString(...data: Array<Data>): string {
    let result: string = "";
    for (let i: bigint = 0n; i < data.length; i ++) {
        if (i !== 0n) result = ", ";
        result += data[Number(i)];
    }
    return result;
}