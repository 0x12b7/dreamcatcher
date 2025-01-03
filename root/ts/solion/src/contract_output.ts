import { EvmOutput } from "@root";

export type ContractOutput = {
    abi?: Array<object>;
    metadata?: string;
    userdoc?: object;
    devdoc?: object;
    ir?: string;
    evm?: EvmOutput;
    ewasm?: {
        wast?: string;
        wasm?: string;
    };
};

export function ContractOutput(_instance: ContractOutput): ContractOutput {
    /***/ {
        return _instance;
    }
}