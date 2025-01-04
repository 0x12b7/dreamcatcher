import type { AbstractBinaryInterface } from "@core.vm.ethereum";
import type { Bytecode } from "@core.vm.ethereum";

export type DeploymentTransaction<T1 extends Array<unknown>> = {
    type: "TX.DEPLOYMENT_TRANSACTION";
    bytecode: Bytecode;
    abstractBinaryInterface: AbstractBinaryInterface;
    args?: T1;
    gasPrice?: bigint;
    gasLimit?: bigint;
    amount?: bigint;
    chainId?: bigint;
    confirmations?: bigint;
}

export function DeploymentTransaction<T1 extends Array<unknown>>({
    bytecode,
    abstractBinaryInterface,
    args,
    gasPrice,
    gasLimit,
    amount = 0n,
    chainId,
    confirmations = 1n
}: Omit<DeploymentTransaction<T1>, "type">): DeploymentTransaction<T1> {
    /** @constructor */ {
        return {
            type: "TX.DEPLOYMENT_TRANSACTION",
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