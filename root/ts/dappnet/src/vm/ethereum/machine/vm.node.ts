import type { Transaction } from "src/vm/ethereum/mod";
import type { VmError } from "@core.vm.ethereum";
import type { ContractMethod } from "ethers";
import type { TransactionResponse } from "ethers";
import type { TransactionReceipt } from "ethers";
import { Result } from "reliq";
import { Unsafe } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Query } from "@core.vm.ethereum";
import { Call } from "@core.vm.ethereum";
import { Deployment } from "@core.vm.ethereum";
import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { Wallet } from "ethers";
import { Interface } from "ethers";
import { wrap } from "reliq";
import { wrapAsync } from "reliq";
import { signatureToName } from "@core.vm.ethereum";

export type Vm = {
    receive<T1 extends Array<unknown>>(transaction: Transaction<T1>): Promise<Result<TransactionReceipt | Unsafe, VmError>>
};

export function Vm(_nodeUrl: string): Result<Vm, Unsafe> {
    let _node: JsonRpcProvider;

    /** @constructor */ {
        let jsonRpcProviderR: Result<JsonRpcProvider, Unsafe> = 
            wrap(() => {
                return new JsonRpcProvider(_nodeUrl);
            });
        if (jsonRpcProviderR.err()) return jsonRpcProviderR;
        _node = jsonRpcProviderR.unwrapSafely();
        return Ok({ receive });
    }

    async function receive(... [tx]: Parameters<Vm["receive"]>): ReturnType<Vm["receive"]> {
        let walletR: Result<Wallet, Unsafe> =
            wrap(() => {
                return new Wallet(tx.privateKey, _node);
            });
        if (walletR.err()) return walletR;
        let wallet: Wallet = walletR.unwrapSafely();
        if (tx.type === "TX.QUERY_TRANSACTION") return _query(tx, wallet);
        else if (tx.type === "TX.TRANSACTION") return _call(tx, wallet);
        else return Err("VM.ERR_UNKNOWN");
    }

    async function _query<T1 extends Array<unknown>>(tx: Query<T1>, wallet: Wallet): Promise<Result<Unsafe, VmError>> {
        let contractR: Result<Contract, Unsafe> =
        wrap(() => {
            return new Contract(tx.to, [tx.signature], wallet);
        });
        if (contractR.err()) return contractR;
        let contract: Contract = contractR.unwrapSafely();
        let contractMethodR: Result<ContractMethod, Unsafe> = wrap(contract.getFunction, signatureToName(tx.signature));
        if (contractMethodR.err()) return contractMethodR;
        let contractMethod: ContractMethod = contractMethodR.unwrapSafely();
        let responseR: Result<unknown, Unsafe> = await wrapAsync(contractMethod, tx.args);
        if (responseR.err()) {
            let unsafe: Unsafe = responseR.val();
            return Err(_map(unsafe));
        }
        let response: unknown = responseR.unwrapSafely();
        return Ok(Unsafe(response));
    }

    async function _call<T1 extends Array<unknown>>(tx: Call<T1>, wallet: Wallet): Promise<Result<TransactionReceipt, VmError>> {
        let addressR: Result<string, Unsafe> = await wrapAsync(wallet.getAddress);
        if (addressR.err()) return addressR;
        let address: string = addressR.unwrapSafely();
        let nonceR: Result<number, Unsafe> = await wrapAsync(wallet.getNonce);
        if (nonceR.err()) return nonceR;
        let nonce: number = nonceR.unwrapSafely();
        let intfR: Result<Interface, Unsafe> = wrap(() => {
            return new Interface([tx.signature]);
        });
        if (intfR.err()) return intfR;
        let intf: Interface = intfR.unwrapSafely();
        let encodingR: Result<string, Unsafe> = wrap(intf.encodeFunctionData, signatureToName(tx.signature), tx.args);
        if (encodingR.err()) return encodingR;
        let encoding: string = encodingR.unwrapSafely();
        let responseR: Result<TransactionResponse | null, Unsafe> = await wrapAsync(wallet.sendTransaction, {
            from: address,
            to: tx.to,
            nonce,
            gasPrice: tx.gasPrice,
            gasLimit: tx.gasLimit,
            data: encoding
        });
        if (responseR.err()) return responseR;
        let response: TransactionResponse | null = responseR.unwrapSafely();
        if (response === null) return Err("VM.ERR_INVALID_RESPONSE");
        let receiptR: Result<TransactionReceipt | null, Unsafe> = await wrapAsync(response.wait);
        if (receiptR.err()) return receiptR;
        let receipt: TransactionReceipt | null = receiptR.unwrapSafely();
        if (receipt === null) return Err("VM.ERR_INVALID_RESPONSE");
        return Ok(receipt);
    }

    function _map(unsafe: Unsafe): VmError {
        let e: unknown = unsafe.unwrap();
        let match: boolean =
            e !== null
            && e !== undefined
            && typeof e === "object"
            && "code" in e
            && typeof e.code === "string";
        if (match === false) return Err("VM.ERR_UNKNOWN");
        let code: string = (e as any).code;
        let errcode: VmError = "VM.ERR_BAD_DATA";
        return Err(errcode);
    }
}