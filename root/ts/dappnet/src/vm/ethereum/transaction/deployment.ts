import type { AbstractBinaryInterface } from "src/vm/ethereum/mod";
import type { Bytecode } from "src/vm/ethereum/mod";

export type Deployment<T1 extends Array<unknown>> = {
    type: "TX.DEPLOYMENT_TRANSACTION";
    privateKey: string;
    bytecode: Bytecode;
    abstractBinaryInterface: AbstractBinaryInterface;
    args?: T1;
    gasPrice?: bigint;
    gasLimit?: bigint;
    amount?: bigint;
    chainId?: bigint;
    confirmations?: bigint;
}

export function Deployment<T1 extends Array<unknown>>({
    privateKey,
    bytecode,
    abstractBinaryInterface,
    args,
    gasPrice,
    gasLimit,
    amount = 0n,
    chainId,
    confirmations = 1n
}: Omit<Deployment<T1>, "type">): Deployment<T1> {
    /** @constructor */ {
        return {
            type: "TX.DEPLOYMENT_TRANSACTION",
            privateKey,
            bytecode,
            abstractBinaryInterface,
            args,
            gasPrice,
            gasLimit,
            amount,
            chainId,
            confirmations
        };
    }
}