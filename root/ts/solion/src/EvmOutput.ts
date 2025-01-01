import { EvmSelector } from "dappnet";
import { Bytecode } from "@$";

export type EvmOutput = {
    assembly?: string;
    legacyAssembly?: object;
    bytecode?: Bytecode;
    deployedBytecode?: Bytecode;
    methodIdentifiers?: {
        [selector: EvmSelector]: string;
    };
    gasEstimates?: {
        creation?: {
            codeDepositCost?: string;
            executionCost?: string;
            totalCost?: string;
        };
        external?: {
            [selector: EvmSelector]: string
        };
        internal?: {
            [selector: EvmSelector]: string
        };
    };
};
export function EvmOutput($: EvmOutput): EvmOutput {
    /***/ {
        return $;
    }
}