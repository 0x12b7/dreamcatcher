import type { Transaction } from "src/vm/ethereum/mod";
import type { VmError } from "@core.vm.ethereum";
import type { ContractMethod } from "ethers";
import { Result } from "reliq";
import { Unsafe } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { JsonRpcProvider } from "ethers";
import { Contract } from "ethers";
import { Wallet } from "ethers";
import { wrap } from "reliq";
import { wrapAsync } from "reliq";
import { signatureToName } from "@core.vm.ethereum";

export type Vm = {
    receive<T1 extends Array<unknown>>(transaction: Transaction<T1>): Promise<Result<Unsafe, VmError>>
};

export function Vm(_nodeUrl: string): Result<Vm, Unsafe> {
    let _node: JsonRpcProvider;

    /** @constructor */ {
        return wrap(() => new JsonRpcProvider(_nodeUrl))
            .andThen(node => Ok(_node = node))
            .andThen(() => Ok({ receive }));
    }

    async function receive(... [transaction]: Parameters<Vm["receive"]>): ReturnType<Vm["receive"]> {
        if (transaction.type === "TX.QUERY_TRANSACTION") {
            return await new Promise(resolve => wrap(() => new Wallet(transaction.privateKey, _node))
                .andThen(wallet => wrap(() => new Contract(transaction.to, [transaction.signature], wallet)))
                .andThen(contract => wrap(() => contract.getFunction(signatureToName(transaction.signature))))
                .andThen(contractMethod => {
                    wrapAsync(() => contractMethod(transaction.args))
                        .then(responseR => {
                            if (responseR.err()) {
                                let unsafe: Unsafe = responseR.val();
                                let e: unknown = unsafe.unwrap();
                                let match: boolean =
                                    e !== null
                                    && e !== undefined
                                    && typeof e === "object"
                                    && "code" in e
                                    && typeof e.code === "string";
                                if (!match) resolve(Err("VM.ERR_UNKNOWN"));
                                else {
                                    let code: string = (e as any).code;
                                    let errcode: VmError = 
                                        code === "UNKNOWN_ERROR" ? "VM.ERR_UNKNOWN" :
                                        code === "NOT_IMPLEMENTED" ? "VM.ERR_NOT_IMPLEMENTED" :
                                        code === "UNSUPPORTED_OPERATION" ? "VM.ERR_UNSUPPORTED_OPERATION" :
                                        code === "NETWORK_ERROR" ? "VM.ERR_NETWORK" :
                                        code === "SERVER_ERROR" ? "VM.ERR_SERVER" :
                                        code === "TIMEOUT" ? "VM.ERR_TIMEOUT" :
                                        code === "BAD_DATA" ? "VM.ERR_BAD_DATA" :
                                        code === "CANCELLED" ? "VM.ERR_CANCELLED" :
                                        code === "BUFFER_OVERRUN" ? "VM.ERR_BUFFER_OVERRUN" :
                                        code === "NUMERIC_FAULT" ? "VM.ERR_NUMERIC_FAULT" :
                                        code === "INVALID_ARGUMENT" ? "VM.ERR_INVALID_ARGUMENT" :
                                        code === "MISSING_ARGUMENT" ? "VM.ERR_MISSING_ARGUMENT" :
                                        code === "UNEXPECTED_ARGUMENT" ? "VM.ERR_UNEXPECTED_ARGUMENT" :
                                        code === "CALL_EXCEPTION" ? "VM.ERR_CALL_EXCEPTION" :
                                        code === "INSUFFICIENT_FUNDS" ? "VM.ERR_INSUFFICIENT_FUNDS" :
                                        code === "NONCE_EXPIRED" ? "VM.ERR_NONCE_EXPIRED" :
                                        code === "REPLACEMENT_UNDERPRICED" ? "VM.ERR_REPLACEMENT_UNDERPRICED" :
                                        
                                    
                                    
                                    "VM.ERR_UNKNOWN";
                                    
                                    
                                    if (code === "UNKNOWN_ERROR") errcode = "VM.ERR_UNKNOWN";
                                    
                                    resolve(Err(errcode));
                                }
                                return;
                            }
                            return;
                        })
                        .catch(e => resolve(Err(Unsafe(e))));
                    return Ok(undefined);
                })
            );
        }
        return Err(Unsafe(400));
    }
}