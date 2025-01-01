import type { EvmAbstractBinaryInterface } from "dappnet";
import type { EvmSelector } from "dappnet";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { JsonRpcProvider } from "ethers";
import { Wallet } from "ethers";
import { Contract } from "ethers";

export type SmartContract


export type SmartContract = {
    get(selector: EvmSelector, args: ReadonlyArray<unknown>): Promise<Ok<unknown> | Err<[unknown]>>;
    mut(): Promise<Ok<unknown> | Err<[unknown]>>;
};
export function SmartContract(_address: string, _nodeUrl: string, _accountKey: string, _abi: EvmAbstractBinaryInterface):
    | Ok<SmartContract>
    | Err<[unknown]> {
    let _jsonRpcProvider: JsonRpcProvider;
    let _wallet: Wallet;

    /***/ {
        let r:
                | Ok<void>
                | Err<[unknown]>
                =
            Result.wrap(() => {
                _jsonRpcProvider = new JsonRpcProvider(_nodeUrl);
                _wallet = new Wallet(_accountKey, _jsonRpcProvider);
            });
        if (r.err()) return Err([r.val()]);
        return Ok({ });
    }

    async function get(selector: EvmSelector, args: ReadonlyArray<unknown>): ReturnType<SmartContract["get"]> {
        let contract = new Contract(_address, _abi, _wallet);
        let contractFunction = contract.getFunction(selector);
        let response = await contractFunction(...args);
        
    }
}
