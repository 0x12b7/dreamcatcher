import type { Signature } from "@core.vm.ethereum";

export function signatureToName(signature: Signature): string {
    let shards: Array<string> = signature.split(" ");
    let string: string = shards[1];
    return string.split("(")[0];
}