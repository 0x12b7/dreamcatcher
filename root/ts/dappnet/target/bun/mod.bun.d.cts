import { TransactionResponse, TransactionReceipt } from 'ethers';
import { Unsafe, Option, Fpv, Result } from 'reliq';

type TransactionResponse$0 = TransactionResponse;
type TransactionReceipt$0 = TransactionReceipt;
type Result$0$1<T1, T2> = Result<T1, T2>;
type EthereumVirtualMachine = {
    query<T1 extends EthereumVirtualMachine.Payload>(transaction: EthereumVirtualMachine.Query<T1>): Promise<EthereumVirtualMachine.Result<Unsafe>>;
    touch<T1 extends EthereumVirtualMachine.Payload>(transaction: EthereumVirtualMachine.Touch<T1>): Promise<EthereumVirtualMachine.Result<Option<EthereumVirtualMachine.TransactionReceipt>>>;
    deploy<T1 extends EthereumVirtualMachine.Payload>(transaction: EthereumVirtualMachine.Deployment<T1>): Promise<EthereumVirtualMachine.Result<EthereumVirtualMachine.Address>>;
};
declare function EthereumVirtualMachine(_url: string): EthereumVirtualMachine.Result<EthereumVirtualMachine>;
declare namespace EthereumVirtualMachine {
    type Result<T1> = Result$0$1<T1, Error>;
    type Error = {
        code: ErrorCode;
        data: Option<unknown>;
        message: Option<unknown>;
        transaction: Option<unknown>;
        reason: Option<unknown>;
    };
    type ErrorCode = "EVM.ERR_MALFORMED_SIGNATURE" | "EVM.ERR_UNKNOWN" | "EVM.ERR_NOT_IMPLEMENTED" | "EVM.ERR_UNSUPPORTED_OPERATION" | "EVM.ERR_NETWORK_FAULT" | "EVM.ERR_SERVER_FAULT" | "EVM.ERR_TIMEOUT" | "EVM.ERR_BAD_DATA" | "EVM.ERR_CANCELLED" | "EVM.ERR_INVALID_RESPONSE" | "EVM.ERR_BUFFER_OVERRUN" | "EVM.ERR_NUMERIC_FAULT" | "EVM.ERR_INVALID_ARGUMENT" | "EVM.ERR_MISSING_ARGUMENT" | "EVM.ERR_UNEXPECTED_ARGUMENT" | "EVM.ERR_CALL_EXCEPTION" | "EVM.ERR_INSUFFICIENT_FUNDS" | "EVM.ERR_NONCE_EXPIRED" | "EVM.ERR_REPLACEMENT_UNDERPRICED" | "EVM.ERR_TRANSACTION_REPLACED" | "EVM.ERR_UNCONFIGURED_NAME" | "EVM.ERR_OFFCHAIN_FAULT" | "EVM.ERR_ACTION_REJECTED";
    type TransactionResponse = TransactionResponse$0;
    type TransactionReceipt = TransactionReceipt$0;
    type Transaction<T1 extends Payload = Payload> = Query<T1> | Touch<T1> | Deployment<T1>;
    type Query<T1 extends Payload = Payload> = {
        privateKey: string;
        to: EthereumVirtualMachine.Address;
        signature: NonNeutralSignature;
        payload?: T1;
    };
    type Touch<T1 extends Payload = Payload> = {
        privateKey: string;
        to: EthereumVirtualMachine.Address;
        signature: NonNeutralSignature;
        payload?: T1;
        gasPrice?: Fpv.Compatible<18n>;
        gasLimit?: Fpv.Compatible<18n>;
        amount?: Fpv.Compatible<18n>;
        chainId?: bigint;
        timeout?: bigint;
        confirmations?: bigint;
    };
    type Deployment<T1 extends Payload = Payload> = {
        privateKey: string;
        bytecode: Bytecode;
        abi: AbstractBinaryInterface;
        payload?: T1;
        gasPrice?: Fpv.Compatible<18n>;
        gasLimit?: Fpv.Compatible<18n>;
        amount?: Fpv.Compatible<18n>;
        chainId?: bigint;
        confirmations?: bigint;
    };
    type Payload = Array<unknown>;
    type NonNeutralSignature = Exclude<Signature, EventSignature>;
    type Signature = EventSignature | ExternalPureSignature | ExternalViewSignature | ExternalSignature;
    type SignatureBuilderResult<T1> = Result$0$1<T1, SignatureBuilderErrorCode>;
    type SignatureBuilderErrorCode = "SIGNATURE_BUILDER.ERR_MISSING_NAME" | "SIGNATURE_BUILDER.ERR_MISSING_TYPE" | "SIGNATURE_BUILDER.ERR_MALFORMED_SIGNATURE";
    type SignatureBuilder = {
        name(name: string): SignatureBuilder;
        event(): SignatureBuilder;
        external(): SignatureBuilder;
        pure(): SignatureBuilder;
        view(): SignatureBuilder;
        payload(...data: Array<Data>): SignatureBuilder;
        returns(...data: Array<Data>): SignatureBuilder;
        build(): SignatureBuilderResult<Signature>;
    };
    function SignatureBuilder(): SignatureBuilder;
    type SignatureHandler = {
        nameOf(signature: Signature): Option<string>;
    };
    const SignatureHandler: SignatureHandler;
    type EventSignature = `event ${string}(${string})`;
    type EventSignatureHandler = {
        from(selector: Selector): EventSignature;
    };
    const EventSignature: EventSignatureHandler;
    type ExternalPureSignature = `function ${string}(${string}) external pure returns (${string})`;
    type ExternalPureSignatureHandler = {
        from(selector: Selector, ...data: Array<Data>): ExternalPureSignature;
    };
    const ExternalPureSignature: ExternalPureSignatureHandler;
    type ExternalViewSignature = `function ${string}(${string}) external view returns (${string})`;
    type ExternalViewSignatureHandler = {
        from(selector: Selector, ...data: Array<Data>): ExternalViewSignature;
    };
    const ExternalViewSignature: ExternalViewSignatureHandler;
    type ExternalSignature = `function ${string}(${string}) external`;
    type ExternalSignatureHandler = {
        from(selector: Selector): ExternalSignature;
    };
    const ExternalSignature: ExternalSignatureHandler;
    type Selector = `${string}(${string})`;
    type SelectorHandler = {
        from(name: string, ...data: Array<Data>): Selector;
    };
    const Selector: SelectorHandler;
    type String = {
        from(...data: Array<Data>): string;
    };
    const String: String;
    type StructData = Array<Data>;
    type Data = ArithmeticData | BytesData | AddressData | BooleanData | StringData | ArrayData | StructData;
    type ArrayData = `${ArithmeticData | BytesData | AddressData | BooleanData | StringData}[]`;
    type AddressData = "address";
    type BooleanData = "bool";
    type StringData = "string";
    type ArithmeticData = "uint" | "int" | `${"uint" | "int"}${ArithmeticDataBitSize}`;
    type ArithmeticDataBitSize = "8" | "16" | "24" | "32" | "40" | "48" | "56" | "64" | "72" | "80" | "88" | "96" | "104" | "112" | "120" | "128" | "136" | "144" | "152" | "160" | "168" | "176" | "184" | "192" | "200" | "208" | "216" | "224" | "232" | "240" | "248" | "256";
    type BytesData = "bytes" | `bytes${BytesDataBitSize}`;
    type BytesDataBitSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32";
    type AbstractBinaryInterface = Array<Signature> | Array<object>;
    type Bytecode = string;
    type Address = `0x${string}`;
}

type Result$0<T1, T2> = Result<T1, T2>;
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
    type Result<T1> = Result$0<T1, Unsafe>;
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

export { Compiler, EthereumVirtualMachine };
