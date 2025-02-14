/// @ts-ignore
import { default as Solc } from "solc";
import { EthereumVirtualMachine } from "dappnet";
import { Result as Result$0 } from "@tokyo/reliq";
import { Ok } from "@tokyo/reliq";
import { Unsafe } from "@tokyo/reliq";
import { wrap } from "@tokyo/reliq";

export type Compiler = {
    compile(configuration: Compiler.Configuration): Compiler.Result<Compiler.Output>;
};

export function Compiler(): Compiler {
    /** @constructor */ {
        return { compile };
    }

    function compile(configuration: Compiler.Configuration): Compiler.Result<Compiler.Output> {
        let configuration$0: Result$0<string, Unsafe> = wrap(() => {
            return JSON.stringify(configuration);
        });
        if (configuration$0.err()) return configuration$0;
        let configuration$1: string = configuration$0.unwrap();
        let content: Result$0<string, Unsafe> = wrap(() => {
            return Solc.compile(configuration$1);
        });
        if (content.err()) return content;
        let content$0: string = content.unwrap();
        let out: Result$0<unknown, Unsafe> = wrap(() => {
            return JSON.parse(content$0);
        });
        if (out.err()) return out;
        let out$0: unknown = out.unwrap();
        return Ok((out$0 as Compiler.Output));
    }    
}

export namespace Compiler {
    export type Configuration = {
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

    export type Output = {
        errors?: Array<Error>;
        sources?: {
            [fileName: string]: SourceOutput;
        };
        contracts?: {
            [fileName: string]: {
                [contract: string]: ContractOutput;
            }
        };
    };

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

    export type EvmOutput = {
        assembly?: string;
        legacyAssembly?: object;
        bytecode?: Bytecode;
        deployedBytecode?: Bytecode;
        methodIdentifiers?: {
            [selector: EthereumVirtualMachine.Selector]: string;
        };
        gasEstimates?: {
            creation?: {
                codeDepositCost?: string;
                executionCost?: string;
                totalCost?: string;
            };
            external?: {
                [selector: EthereumVirtualMachine.Selector]: string
            };
            internal?: {
                [selector: EthereumVirtualMachine.Selector]: string
            };
        };
    };

    export type Result<T1> = Result$0<T1, Unsafe>;

    export type Error = {
        sourceLocation?: SourceLocation;
        type: ErrorCode;
        component: string;
        severity: "error" | "warning";
        message: string;
        formattedMessage?: string;
    };

    export type ErrorCode =
        | "JSONError"
        | "IOError"
        | "ParserError"
        | "DocstringParsingError"
        | "SyntaxError"
        | "DeclarationError"
        | "TypeError"
        | "UnimplementedFeatureError"
        | "InternalCompilerError"
        | "Exception"
        | "CompilerError"
        | "FatalError"
        | "Warning";

    export type Bytecode = {
        object?: string;
        opcodes?: string;
        sourceMap?: string;
        linkReferences?: {
            [fileName: string]: {
                [library: string]: Array<{
                    start: number;
                    length: number;
                }>;
            };
        };
    };

    export type SourceLocation = {
        file: string;
        start: number;
        end: number;
    };

    export type SourceOutput = {
        id: number;
        ast: object;
        legacyAST?: object;
    };
}