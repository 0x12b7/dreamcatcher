import { Signature } from "dappnet";

export type Call<T1 extends Array<unknown>> = {
    type: "TX.CALL";
    to: string;
    signature: Signature;
    args?: T1;
    gasPrice?: bigint;
    gasLimit?: bigint;
    value?: bigint;
    chainId?: bigint;
    confirmations?: bigint;
};

export function Call<T1 extends Array<unknown>>(_instance: Call<T1>): Call<T1> {

}

Call({
    to: "",
    signature: "",
    args: [""],
    gasPrice: 2000n,
    gasLimit: 2000000n
})