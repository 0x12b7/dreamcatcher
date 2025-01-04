import type { Transaction } from "src/vm/ethereum/mod";
import type { VmError } from "@core.vm.ethereum";
import { Result } from "reliq";
import { Unsafe } from "reliq";


export type Vm = {
    receive<T1 extends Array<unknown>>(transaction: Transaction<T1>): Promise<Result<Unsafe, VmError>>
};

export function Vm() {

    async function receive<T1 extends Array<unknown>>(transaction: Transaction<T1>) {
        if (transaction.type === "TX.QUERY_TRANSACTION") {
            
        }
    }
}