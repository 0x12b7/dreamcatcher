import { Result, Unsafe } from 'reliq';

type Bytecode = {
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
declare function Bytecode(_instance: Bytecode): Bytecode;

type CompilerError = "JSONError" | "IOError" | "ParserError" | "DocstringParsingError" | "SyntaxError" | "DeclarationError" | "TypeError" | "UnimplementedFeatureError" | "InternalCompilerError" | "Exception" | "CompilerError" | "FatalError" | "Warning";

type Compiler = {
    compile(config: Config): Result<Output, Unsafe>;
};
declare const Compiler: Compiler;

type Config = {
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
        evmVersion?: "homestead" | "tangerineWhistle" | "spuriousDragon" | "byzantium" | "constantinople" | "petersburg" | "istanbul" | "berlin" | "london";
        metadata?: {
            useLiteralContent: boolean;
        };
        libraries?: {
            [fileName: string]: {
                [library: string]: string;
            };
        };
        outputSelection?: {
            "*": {
                "*": Array<"abi" | "ast" | "legacyAST" | "devdoc" | "userdoc" | "metadata" | "ir" | "evm.assembly" | "evm.legacyAssembly" | "evm.bytecode.object" | "evm.bytecode.opcodes" | "evm.bytecode.sourceMap" | "evm.bytecode.linkReferences" | "evm.methodIdentifiers" | "evm.gasEstimates" | "ewasm.wast" | "ewasm.wasm">;
            };
        };
    };
};
declare function Config(_instance: Config): Config;

type ContractOutput = {
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
declare function ContractOutput(_instance: ContractOutput): ContractOutput;

type Error = {
    sourceLocation?: SourceLocation;
    type: CompilerError;
    component: string;
    severity: "error" | "warning";
    message: string;
    formattedMessage?: string;
};
declare function Error(_instance: Error): Error;

type EvmOutput = {
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
            [selector: EvmSelector]: string;
        };
        internal?: {
            [selector: EvmSelector]: string;
        };
    };
};
declare function EvmOutput(_instance: EvmOutput): EvmOutput;

type Output = {
    errors?: Array<Error>;
    sources?: {
        [fileName: string]: SourceOutput;
    };
    contracts?: {
        [fileName: string]: {
            [contract: string]: ContractOutput;
        };
    };
};
declare function Output(_instance: Output): Output;

type SourceLocation = {
    file: string;
    start: number;
    end: number;
};
declare function SourceLocation(_instance: SourceLocation): SourceLocation;

type SourceOutput = {
    id: number;
    ast: object;
    legacyAST?: object;
};
declare function SourceOutput(_instance: SourceOutput): SourceOutput;

export { Bytecode, Compiler, type CompilerError, Config, ContractOutput, Error, EvmOutput, Output, SourceLocation, SourceOutput };
