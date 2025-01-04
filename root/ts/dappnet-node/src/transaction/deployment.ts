import type { EvmAbstractBinaryInterface } from "dappnet";
import type { EvmBytecode } from "dappnet";

export type Deployment<T1 extends Array<unknown>> = {
    type: "TX.DEPLOYMENT";
    bytecode: EvmBytecode;
    abstractBinaryInterface: EvmAbstractBinaryInterface;
    payload?: T1
    gasPrice?: bigint;
    gasLimit?: bigint;
    value?: bigint;
    chainId?: bigint;
    confirmations?: bigint;
};

export function Deployment<T1 extends Array<unknown>>(_instance: Deployment<T1>) {
    /** @constructor */ {
        return _instance;
    }
}