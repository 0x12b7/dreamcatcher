import type { VmErrorCode } from "@core.vm.ethereum";
import type { ContractMethod } from "ethers";
import type { TransactionResponse } from "ethers";
import type { TransactionReceipt } from "ethers";
import type { BaseContract } from "ethers";
import { Result } from "reliq";
import { Unsafe } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Option } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { VmError } from "@core.vm.ethereum";
import { Query } from "@core.vm.ethereum";
import { Touch } from "@core.vm.ethereum";
import { Deployment } from "@core.vm.ethereum";
import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { ContractFactory } from "ethers";
import { Wallet } from "ethers";
import { Interface } from "ethers";
import { wrap } from "reliq";
import { wrapAsync } from "reliq";
import { signatureToName } from "@core.vm.ethereum";

export type Vm = {
    query<T1 extends Array<unknown>>(tx: Query<T1>): Promise<Result<Unsafe, VmError>>;
    touch<T1 extends Array<unknown>>(tx: Touch<T1>): Promise<Result<TransactionReceipt, VmError>>;
    deploy<T1 extends Array<unknown>>(tx: Deployment<T1>): Promise<Result<string, VmError>>;
};

export function Vm(_nodeUrl: string): Result<Vm, VmError> {
    let _jsonRpcProvider: JsonRpcProvider;

    /** @constructor */ {
        let jsonRpcProviderR: Result<JsonRpcProvider, Unsafe> = wrap(() => {
            return new JsonRpcProvider(_nodeUrl);
        });
        if (jsonRpcProviderR.err()) return jsonRpcProviderR.mapErr(e => _mapUnsafe(e));
        _jsonRpcProvider = jsonRpcProviderR.unwrapSafely();
        return Ok({ query, touch, deploy });
    }

    async function query<T1 extends Array<unknown>>(tx: Query<T1>): Promise<Result<Unsafe, VmError>> {
        let walletR: Result<Wallet, Unsafe> = wrap(() => {
            return new Wallet(tx.privateKey, _jsonRpcProvider);
        });
        if (walletR.err()) return walletR.mapErr(e => _mapUnsafe(e));
        let wallet: Wallet = walletR.unwrapSafely();
        let contractR: Result<Contract, Unsafe> = wrap(() => {
            return new Contract(tx.to, [tx.signature], wallet);
        });
        if (contractR.err()) return contractR.mapErr(e => _mapUnsafe(e));
        let contract: Contract = contractR.unwrapSafely();
        let contractMethodR: Result<ContractMethod, Unsafe> = wrap(() => {
            return contract.getFunction(tx.signature);
        });
        if (contractMethodR.err()) return contractMethodR.mapErr(e => _mapUnsafe(e));
        let contractMethod: ContractMethod = contractMethodR.unwrapSafely();
        let responseR: Result<unknown, Unsafe> = await wrapAsync(async () => {
            return await contractMethod(tx.args ?? []);
        });
        if (responseR.err()) return responseR.mapErr(e => _mapUnsafe(e));
        let response: unknown = responseR.unwrapSafely();
        return Ok(Unsafe(response));
    }

    async function touch<T1 extends Array<unknown>>(tx: Touch<T1>): Promise<Result<TransactionReceipt, VmError>> {
        let walletR: Result<Wallet, Unsafe> = wrap(() => {
            return new Wallet(tx.privateKey, _jsonRpcProvider);
        });
        if (walletR.err()) return walletR.mapErr(e => _mapUnsafe(e));
        let wallet: Wallet = walletR.unwrapSafely();
        let addressR: Result<string, Unsafe> = await wrapAsync(async () => {
            return await wallet.getAddress();
        });
        if (addressR.err()) return addressR.mapErr(e => _mapUnsafe(e));
        let address: string = addressR.unwrapSafely();
        let nonceR: Result<number, Unsafe> = await wrapAsync(async () => {
            return await wallet.getNonce();
        });
        if (nonceR.err()) return nonceR.mapErr(e => _mapUnsafe(e));
        let nonce: number = nonceR.unwrapSafely();
        let intfR: Result<Interface, Unsafe> = wrap(() => {
            return new Interface([tx.signature]);
        });
        if (intfR.err()) return intfR.mapErr(e => _mapUnsafe(e));
        let intf: Interface = intfR.unwrapSafely();
        let dataR: Result<string, Unsafe> = wrap(() => {
            return intf.encodeFunctionData(signatureToName(tx.signature), tx.args);
        });
        if (dataR.err()) return dataR.mapErr(e => _mapUnsafe(e));
        let data: string = dataR.unwrapSafely();
        let responseR: Result<TransactionResponse | null, Unsafe> = await wrapAsync(async () => {
            return await wallet.sendTransaction({
                from: address,
                to: tx.to,
                nonce,
                gasPrice: tx.gasPrice,
                gasLimit: tx.gasLimit,
                data
            });
        });
        if (responseR.err()) return responseR.mapErr(e => _mapUnsafe(e));
        let response: TransactionResponse | null = responseR.unwrapSafely();
        if (response === null) return Err(VmError({
            code: "VM.ERR_INVALID_RESPONSE",
            data: None,
            message: None,
            transaction: None,
            reason: None
        }));
        let receiptR: Result<TransactionReceipt | null, Unsafe> = await wrapAsync(async () => {
            return await response.wait(Number(tx.confirmations), tx.timeout);
        });
        if (receiptR.err()) return receiptR.mapErr(e => _mapUnsafe(e));
        let receipt: TransactionReceipt | null = receiptR.unwrapSafely();
        if (receipt === null) return Err(VmError({
            code: "VM.ERR_INVALID_RESPONSE",
            data: None,
            message: None,
            transaction: None,
            reason: None
        }));
        return Ok(receipt);
    }

    async function deploy<T1 extends Array<unknown>>(tx: Deployment<T1>): Promise<Result<string, VmError>> {
        let walletR: Result<Wallet, Unsafe> = wrap(() => {
            return new Wallet(tx.privateKey, _jsonRpcProvider);
        });
        if (walletR.err()) return walletR.mapErr(e => _mapUnsafe(e));
        let wallet: Wallet = walletR.unwrapSafely();
        let contractFactoryR: Result<ContractFactory, Unsafe> = wrap(() => {
            return new ContractFactory(tx.abstractBinaryInterface, tx.bytecode, wallet);
        });
        if (contractFactoryR.err()) return contractFactoryR.mapErr(e => _mapUnsafe(e));
        let contractFactory: ContractFactory = contractFactoryR.unwrapSafely();
        let contractR: Result<BaseContract, Unsafe> = await wrapAsync(async () => {
            return await contractFactory.deploy(tx.args);
        });
        if (contractR.err()) return contractR.mapErr(e => _mapUnsafe(e));
        let contract: BaseContract = contractR.unwrapSafely();
        let contractAddressR: Result<string, Unsafe> = await wrapAsync(async () => {
            return await contract.getAddress();
        });
        if (contractAddressR.err()) return contractAddressR.mapErr(e => _mapUnsafe(e));
        let contractAddress: string = contractAddressR.unwrapSafely();
        return Ok(contractAddress);
    }

    function _mapUnsafe(unsafe: Unsafe): VmError {
        let e: unknown = unsafe.unwrap();
        if (!(
            e !== null
            && e !== undefined
            && typeof e === "object"
            && "code" in e
            && typeof e.code === "string"
        )) return VmError({
            code: "VM.ERR_UNKNOWN",
            data: None,
            message: None,
            transaction: None,
            reason: None
        });
        let code: VmErrorCode =
            e.code === "UNKNOWN_ERROR" ? "VM.ERR_UNKNOWN" :
            e.code === "NOT_IMPLEMENTED" ? "VM.ERR_NOT_IMPLEMENTED" :
            e.code === "UNSUPPORTED_OPERATION" ? "VM.ERR_UNSUPPORTED_OPERATION" :
            e.code === "NETWORK_ERROR" ? "VM.ERR_NETWORK_FAULT" :
            e.code === "SERVER_ERROR" ? "VM.ERR_SERVER_FAULT" :
            e.code === "TIMEOUT" ? "VM.ERR_TIMEOUT" :
            e.code === "BAD_DATA" ? "VM.ERR_BAD_DATA" :
            e.code === "CANCELLED" ? "VM.ERR_CANCELLED" :
            e.code === "BUFFER_OVERRUN" ? "VM.ERR_BUFFER_OVERRUN" :
            e.code === "NUMERIC_FAULT" ? "VM.ERR_NUMERIC_FAULT" :
            e.code === "INVALID_ARGUMENT" ? "VM.ERR_INVALID_ARGUMENT" :
            e.code === "MISSING_ARGUMENT" ? "VM.ERR_MISSING_ARGUMENT" :
            e.code === "UNEXPECTED_ARGUMENT" ? "VM.ERR_UNEXPECTED_ARGUMENT" :
            e.code === "CALL_EXCEPTION" ? "VM.ERR_CALL_EXCEPTION" : 
            e.code === "INSUFFICIENT_FUNDS" ? "VM.ERR_INSUFFICIENT_FUNDS" :
            e.code === "NONCE_EXPIRED" ? "VM.ERR_NONCE_EXPIRED" :
            e.code === "REPLACEMENT_UNDERPRICED" ? "VM.ERR_REPLACEMENT_UNDERPRICED" :
            e.code === "TRANSACTION_REPLACED" ? "VM.ERR_TRANSACTION_REPLACED" :
            e.code === "UNCONFIGURED_NAME" ? "VM.ERR_UNCONFIGURED_NAME" :
            e.code === "OFFCHAIN_FAULT" ? "VM.ERR_OFFCHAIN_FAULT" :
            e.code === "ACTION_REJECTED" ? "VM.ERR_ACTION_REJECTED" :
            "VM.ERR_UNKNOWN";
        let data: Option<unknown> = None;
        let message: Option<unknown> = None;
        let transaction: Option<unknown> = None;
        let reason: Option<unknown> = None;
        if ("data" in e) data = Some(e.data);
        if ("message" in e) data = Some(e.message);
        if ("transaction" in e) data = Some(e.transaction);
        if ("reason" in e) data = Some(e.reason);
        return VmError({ code, data, message, transaction, reason });
    }
}