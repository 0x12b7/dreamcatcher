export type Config = {
    language: "Solidity" | "Vyper" | "lll" | "assembly";
    sources: {
        [contract: string]: {
            keccak256?: string;
            urls?: Array<string>;
            content?: string;
        };
    };
    settings?: {
        remappings?: Array<string>;
        optimizer?: {
            enabled: boolean;
            runs: number;
        };
        evmVersion?: 
            | "homestead" 
            | "tangerineWhistle" 
            | "spuriousDragon" 
            | "byzantium" 
            | "constantinople" 
            | "petersburg" 
            | "istanbul" 
            | "berlin" 
            | "london";
        metadata?: {
            useLiteralContent: boolean;
        };
        libraries?: {
            [fileName: string]: {
                [library: string]: string;
            }
        },
        outputSelection?: {
            "*": {
                "*": Array<
                    | "abi"
                    | "ast"
                    | "legacyAST"
                    | "devdoc"
                    | "userdoc"
                    | "metadata"
                    | "ir"
                    | "evm.assembly"
                    | "evm.legacyAssembly"
                    | "evm.bytecode.object"
                    | "evm.bytecode.opcodes"
                    | "evm.bytecode.sourceMap"
                    | "evm.bytecode.linkReferences"
                    | "evm.methodIdentifiers"
                    | "evm.gasEstimates"
                    | "ewasm.wast"
                    | "ewasm.wasm">;
            }
        }
    }
};

export function Config(_instance: Config): Config {
    /** @constructor */ {
        return _instance;
    }
}