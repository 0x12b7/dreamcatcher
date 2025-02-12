import { Unsafe, Result, Option } from 'reliq';

type Result$0$1<T1, T2> = Result<T1, T2>;
type Compiler = {
    compile(configuration: Compiler.Configuration): Compiler.Result<Compiler.Output>;
};
declare function Compiler(): Compiler;
declare namespace Compiler {
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
    type EvmOutput = {
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
                [selector: EthereumVirtualMachine.Selector]: string;
            };
            internal?: {
                [selector: EthereumVirtualMachine.Selector]: string;
            };
        };
    };
    type Result<T1> = Result$0$1<T1, Unsafe>;
    type Error = {
        sourceLocation?: SourceLocation;
        type: ErrorCode;
        component: string;
        severity: "error" | "warning";
        message: string;
        formattedMessage?: string;
    };
    type ErrorCode = "JSONError" | "IOError" | "ParserError" | "DocstringParsingError" | "SyntaxError" | "DeclarationError" | "TypeError" | "UnimplementedFeatureError" | "InternalCompilerError" | "Exception" | "CompilerError" | "FatalError" | "Warning";
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
    type SourceLocation = {
        file: string;
        start: number;
        end: number;
    };
    type SourceOutput = {
        id: number;
        ast: object;
        legacyAST?: object;
    };
}

type AddressData = "address";

type ArithmeticDataBitSize = "8" | "16" | "24" | "32" | "40" | "48" | "56" | "64" | "72" | "80" | "88" | "96" | "104" | "112" | "120" | "128" | "136" | "144" | "152" | "160" | "168" | "176" | "184" | "192" | "200" | "208" | "216" | "224" | "232" | "240" | "248" | "256";

type ArithmeticData = "uint" | "int" | `${"uint" | "int"}${ArithmeticDataBitSize}`;

type BytesDataBitSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32";

type BytesData = "bytes" | `bytes${BytesDataBitSize}`;

type BooleanData = "bool";

type StringData = "string";

type ArrayData = `${ArithmeticData | BytesData | AddressData | BooleanData | StringData}[]`;

type StructData = Array<Data>;

type Data = ArithmeticData | BytesData | AddressData | BooleanData | StringData | ArrayData | StructData;

type SelectorHandler = {
    from(name: string, ...data: Array<Data>): Selector;
};

type Selector = `${string}(${string})`;
declare const Selector: SelectorHandler;

type EventSignature = `event ${string}(${string})`;
declare const EventSignature: EventSignatureHandler;

type EventSignatureHandler = {
    from(selector: Selector): EventSignature;
};

type ExternalPureSignature = `function ${string}(${string}) external pure returns (${string})`;
declare const ExternalPureSignature: ExternalPureSignatureHandler;

type ExternalPureSignatureHandler = {
    from(selector: Selector, ...data: Array<Data>): ExternalPureSignature;
};

type ExternalSignature = `function ${string}(${string}) external`;
declare const ExternalSignature: ExternalSignatureHandler;

type ExternalSignatureHandler = {
    from(selector: Selector): ExternalSignature;
};

type ExternalViewSignature = `function ${string}(${string}) external view returns (${string})`;
declare const ExternalViewSignature: ExternalViewSignatureHandler;

type ExternalViewSignatureHandler = {
    from(selector: Selector, ...data: Array<Data>): ExternalViewSignature;
};

type SignatureHandler = {
    nameOf(signature: Signature): Option<string>;
};

type Signature = EventSignature | ExternalPureSignature | ExternalViewSignature | ExternalSignature;
declare const Signature: SignatureHandler;

type NonAmbientSignature = Exclude<Signature, EventSignature>;

type Result$0<T1, T2> = Result<T1, T2>;
type SignatureBuilder = {
    name(name: string): SignatureBuilder;
    event(): SignatureBuilder;
    external(): SignatureBuilder;
    pure(): SignatureBuilder;
    view(): SignatureBuilder;
    payload(...data: Array<Data>): SignatureBuilder;
    returns(...data: Array<Data>): SignatureBuilder;
    build(): SignatureBuilder.Result<Signature>;
};
declare function SignatureBuilder(): SignatureBuilder;
declare namespace SignatureBuilder {
    type Result<T1> = Result$0<T1, ErrorCode>;
    type ErrorCode = "SIGNATURE_BUILDER.ERR_MISSING_NAME" | "SIGNATURE_BUILDER.ERR_MISSING_TYPE" | "SIGNATURE_BUILDER.ERR_MALFORMED_SIGNATURE";
}

export { type AddressData, type ArithmeticData, type ArithmeticDataBitSize, type ArrayData, type BooleanData, type BytesData, type BytesDataBitSize, Compiler, type Data, EventSignature, type EventSignatureHandler, ExternalPureSignature, type ExternalPureSignatureHandler, ExternalSignature, type ExternalSignatureHandler, ExternalViewSignature, type ExternalViewSignatureHandler, type NonAmbientSignature, Selector, type SelectorHandler, Signature, SignatureBuilder, type SignatureHandler, type StringData, type StructData };
