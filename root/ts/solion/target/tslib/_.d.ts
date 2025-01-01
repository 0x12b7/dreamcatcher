import { Result } from 'reliq';

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
declare function Bytecode($: Bytecode): Bytecode;

type Compiler = {
    compile(configuration: Configuration): Result<Output, unknown>;
};
declare const Compiler: Compiler;

type CompilerE = "JSONError" | "IOError" | "ParserError" | "DocstringParsingError" | "SyntaxError" | "DeclarationError" | "TypeError" | "UnimplementedFeatureError" | "InternalCompilerError" | "Exception" | "CompilerError" | "FatalError" | "Warning";

type Configuration = {
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
declare function Configuration($: Configuration): Configuration;

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
declare function ContractOutput($: ContractOutput): ContractOutput;

type Error = {
    sourceLocation?: SourceLocation;
    type: CompilerE;
    component: string;
    severity: "error" | "warning";
    message: string;
    formattedMessage?: string;
};
declare function Error($: Error): Error;

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
declare function EvmOutput($: EvmOutput): EvmOutput;

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
declare function Output($: Output): Output;

type SourceLocation = {
    file: string;
    start: number;
    end: number;
};
declare function SourceLocation($: SourceLocation): SourceLocation;

type SourceOutput = {
    id: number;
    ast: object;
    legacyAST?: object;
};
declare function SourceOutput($: SourceOutput): SourceOutput;

export { Bytecode, Compiler, type CompilerE, Configuration, ContractOutput, Error, EvmOutput, Output, SourceLocation, SourceOutput };
