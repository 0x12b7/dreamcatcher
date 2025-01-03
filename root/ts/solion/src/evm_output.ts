import { EvmSelector } from "dappnet";
import { Bytecode } from "@root";

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

export function EvmOutput(_instance: EvmOutput): EvmOutput {
    /** @constructor */ {
        return _instance;
    }
}