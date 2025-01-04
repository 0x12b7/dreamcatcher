import type { Signature } from "@core.vm.ethereum";

export type Transaction<T1 extends Array<unknown>> = {
    type: "TX.TRANSACTION";
    to: string;
    signature: Signature;
    args?: T1;
    gasPrice?: bigint;
    gasLimit?: bigint;
    amount?: bigint;
    chainId?: bigint;
    confirmations?: bigint;
};

export function Transaction<T1 extends Array<unknown>>({
    to,
    signature,
    args,
    gasPrice,
    gasLimit,
    amount = 0n,
    chainId,
    confirmations = 1n
}: Omit<Transaction<T1>, "type">): Transaction<T1> {
    /** @constructor */ {
        return {
            type: "TX.TRANSACTION",
            to,
            signature,
            args,
            gasPrice,
            gasLimit,
            amount,
            chainId,
            confirmations
        };
    }
}