import { type ContractMethod } from "ethers";
import { type TransactionReceipt } from "ethers";
import { type TransactionResponse } from "ethers";
import { type BaseContract } from "ethers";
import { ContractFactory } from "ethers";
import { Contract } from "ethers";
import { Interface } from "ethers";
import { Wallet } from "ethers";
import { JsonRpcProvider } from "ethers";
import { Result } from "reliq";
import { Option } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Unsafe } from "reliq";
import { Fpv } from "reliq";
import { wrap } from "reliq";
import { wrapAsync } from "reliq";
import { flag } from "reliq";

type TransactionResponse$0 = TransactionResponse;

type TransactionReceipt$0 = TransactionReceipt;

type Result$0<T1, T2> = Result<T1, T2>;

export type EthereumVirtualMachine = {
    query<T1 extends EthereumVirtualMachine.Payload>(transaction: EthereumVirtualMachine.Query<T1>): Promise<EthereumVirtualMachine.Result<Unsafe>>;
    touch<T1 extends EthereumVirtualMachine.Payload>(transaction: EthereumVirtualMachine.Touch<T1>): Promise<EthereumVirtualMachine.Result<Option<EthereumVirtualMachine.TransactionReceipt>>>;
    deploy<T1 extends EthereumVirtualMachine.Payload>(transaction: EthereumVirtualMachine.Deployment<T1>): Promise<EthereumVirtualMachine.Result<EthereumVirtualMachine.Address>>;
};

export function EthereumVirtualMachine(_url: string): EthereumVirtualMachine.Result<EthereumVirtualMachine> {
    let _jsonRpcProvider: JsonRpcProvider;

    /***/ {
        let jsonRpcProvider: EthereumVirtualMachine.Result<JsonRpcProvider> = _map(wrap(() => {
            return new JsonRpcProvider(_url);
        }));
        if (jsonRpcProvider.err()) return jsonRpcProvider;
        _jsonRpcProvider = jsonRpcProvider.unwrap();
        return Ok({ query, touch, deploy });
    }

    async function query<T1 extends EthereumVirtualMachine.Payload>(transaction: EthereumVirtualMachine.Query<T1>): Promise<EthereumVirtualMachine.Result<Unsafe>> {
        let wallet: EthereumVirtualMachine.Result<Wallet> = _map(wrap(() => {
            return new Wallet(transaction.privateKey, _jsonRpcProvider);
        }));
        if (wallet.err()) return wallet;
        let wallet$0: Wallet = wallet.unwrap();
        let contract: EthereumVirtualMachine.Result<Contract> = _map(wrap(() => {
            return new Contract(transaction.to, [transaction.signature], wallet$0);
        }));
        if (contract.err()) return contract;
        let contract$0: Contract = contract.unwrap();
        let contractMethod: EthereumVirtualMachine.Result<ContractMethod> = _map(wrap(() => {
            return contract$0.getFunction(transaction.signature);
        }));
        if (contractMethod.err()) return contractMethod;
        let contractMethod$0: ContractMethod = contractMethod.unwrap();
        let response: EthereumVirtualMachine.Result<Unsafe> = await _map(wrapAsync(async () => {
            return Unsafe(await contractMethod$0(...transaction.payload ?? []));
        }));
        if (response.err()) return response;
        let response$0: Unsafe = response.unwrap();
        return Ok(response$0);
    }

    async function touch<T1 extends EthereumVirtualMachine.Payload>(transaction: EthereumVirtualMachine.Touch<T1>): Promise<EthereumVirtualMachine.Result<Option<EthereumVirtualMachine.TransactionReceipt>>> {
        let wallet: EthereumVirtualMachine.Result<Wallet> = _map(wrap(() => {
            return new Wallet(transaction.privateKey, _jsonRpcProvider);
        }));
        if (wallet.err()) return wallet;
        let wallet$0: Wallet = wallet.unwrap();
        let address: EthereumVirtualMachine.Result<EthereumVirtualMachine.Address> = await _map(wrapAsync(async () => {
            return await wallet$0.getAddress() as EthereumVirtualMachine.Address;
        }));
        if (address.err()) return address;
        let address$0: EthereumVirtualMachine.Address = address.unwrap();
        let nonce: EthereumVirtualMachine.Result<bigint> = await _map(wrapAsync(async () => {
            return BigInt(await wallet$0.getNonce());
        }));
        if (nonce.err()) return nonce;
        let nonce$0: bigint = nonce.unwrap();
        let interface$0: EthereumVirtualMachine.Result<Interface> = _map(wrap(() => {
            return new Interface([transaction.signature]);
        }));
        if (interface$0.err()) return interface$0;
        let interface$1: Interface = interface$0.unwrap();
        let name: Option<string> = EthereumVirtualMachine.SignatureHandler.nameOf(transaction.signature);
        if (name.none()) return Err({
            code: "EVM.ERR_MALFORMED_SIGNATURE",
            data: None,
            message: None,
            reason: None,
            transaction: None
        });
        let name$0: string = name.unwrap();
        let data: EthereumVirtualMachine.Result<string> = _map(wrap(() => {
            return interface$1.encodeFunctionData(name$0, transaction.payload);
        }));
        if (data.err()) return data;
        let data$0: string = data.unwrap();
        let gasPrice: bigint = transaction.gasPrice ? Fpv.Calculator.unwrap(transaction.gasPrice) : 0n;
        let gasLimit: bigint = transaction.gasLimit ? Fpv.Calculator.unwrap(transaction.gasLimit) : 0n;
        let response: EthereumVirtualMachine.Result<EthereumVirtualMachine.TransactionResponse | null> = await _map(wrapAsync(async () => {
            return await wallet$0.sendTransaction({
                from: address$0,
                to: transaction.to,
                nonce: Number(nonce$0),
                gasPrice: gasPrice,
                gasLimit: gasLimit,
                data: data$0
            });
        }));
        if (response.err()) return response;
        let response$0: EthereumVirtualMachine.TransactionResponse | null = response.unwrap();
        if (response$0 === null) return Err({
            code: "EVM.ERR_INVALID_RESPONSE",
            data: None,
            message: None,
            transaction: None,
            reason: None
        });
        let receipt: EthereumVirtualMachine.Result<EthereumVirtualMachine.TransactionReceipt | null> = await _map(wrapAsync(async () => {
            return await response$0.wait(Number(transaction.confirmations), Number(transaction.timeout));
        }));
        if (receipt.err()) return receipt;
        let receipt$0: EthereumVirtualMachine.TransactionReceipt | null = receipt.unwrap();
        if (receipt$0 === null) return Ok(None);
        return Ok(Some(receipt$0));
    }

    async function deploy<T1 extends EthereumVirtualMachine.Payload>(transaction: EthereumVirtualMachine.Deployment<T1>): Promise<EthereumVirtualMachine.Result<EthereumVirtualMachine.Address>> {        
        let wallet: EthereumVirtualMachine.Result<Wallet> = _map(wrap(() => {
            return new Wallet(transaction.privateKey, _jsonRpcProvider);
        }));
        if (wallet.err()) return wallet;
        let wallet$0: Wallet = wallet.unwrap();
        let contractFactory: EthereumVirtualMachine.Result<ContractFactory> = _map(wrap(() => {
            return new ContractFactory(transaction.abi, transaction.bytecode, wallet$0);
        }));
        if (contractFactory.err()) return contractFactory;
        let contractFactory$0: ContractFactory = contractFactory.unwrap();
        let contract: EthereumVirtualMachine.Result<BaseContract> = await _map(wrapAsync(async () => {
            return await contractFactory$0.deploy(transaction.payload);
        }));
        if (contract.err()) return contract;
        let contract$0: BaseContract = contract.unwrap();
        let address: EthereumVirtualMachine.Result<EthereumVirtualMachine.Address> = await _map(wrapAsync(async () => {
            return await contract$0.getAddress() as EthereumVirtualMachine.Address;
        }));
        if (address.err()) return address;
        let address$0: EthereumVirtualMachine.Address = address.unwrap();
        return Ok(address$0);
    }

    function _map<T1>(result: Promise<Result$0<T1, Unsafe>>): Promise<EthereumVirtualMachine.Result<T1>>;
    function _map<T1>(result: Result$0<T1, Unsafe>): EthereumVirtualMachine.Result<T1>;
    function _map<T1>(unsafe: Unsafe): EthereumVirtualMachine.Error;
    function _map<T1>(
        p0: 
            | Promise<Result$0<T1, Unsafe>>
            | Result$0<T1, Unsafe> 
            | Unsafe
    ): 
        | Promise<EthereumVirtualMachine.Result<T1>>
        | EthereumVirtualMachine.Result<T1> 
        | EthereumVirtualMachine.Error {
        if ("then" in p0) {
            let result: Promise<Result$0<T1, Unsafe>> = p0;
            return result.then(result$0 => {
                return _map(result$0);
            });
        }
        if ("ok" in p0) {
            let result: Result$0<T1, Unsafe> = p0;
            return result.mapErr(error => {
                return _map(error);
            });
        }
        let unsafe: Unsafe = p0;
        let error: unknown = unsafe.inspect();
        if (!(
            error !== null
            && error !== undefined
            && typeof error === "object"
            && "code" in error
            && typeof error.code === "string"
        )) return {
            code: "EVM.ERR_UNKNOWN",
            data: None,
            message: None,
            transaction: None,
            reason: None
        };
        let code: EthereumVirtualMachine.ErrorCode =
            error.code === "UNKNOWN_ERROR" ? "EVM.ERR_UNKNOWN" :
            error.code === "NOT_IMPLEMENTED" ? "EVM.ERR_NOT_IMPLEMENTED" :
            error.code === "UNSUPPORTED_OPERATION" ? "EVM.ERR_UNSUPPORTED_OPERATION" :
            error.code === "NETWORK_ERROR" ? "EVM.ERR_NETWORK_FAULT" :
            error.code === "SERVER_ERROR" ? "EVM.ERR_SERVER_FAULT" :
            error.code === "TIMEOUT" ? "EVM.ERR_TIMEOUT" :
            error.code === "BAD_DATA" ? "EVM.ERR_BAD_DATA" :
            error.code === "CANCELLED" ? "EVM.ERR_CANCELLED" :
            error.code === "BUFFER_OVERRUN" ? "EVM.ERR_BUFFER_OVERRUN" :
            error.code === "NUMERIC_FAULT" ? "EVM.ERR_NUMERIC_FAULT" :
            error.code === "INVALID_ARGUMENT" ? "EVM.ERR_INVALID_ARGUMENT" :
            error.code === "MISSING_ARGUMENT" ? "EVM.ERR_MISSING_ARGUMENT" :
            error.code === "UNEXPECTED_ARGUMENT" ? "EVM.ERR_UNEXPECTED_ARGUMENT" :
            error.code === "CALL_EXCEPTION" ? "EVM.ERR_CALL_EXCEPTION" : 
            error.code === "INSUFFICIENT_FUNDS" ? "EVM.ERR_INSUFFICIENT_FUNDS" :
            error.code === "NONCE_EXPIRED" ? "EVM.ERR_NONCE_EXPIRED" :
            error.code === "REPLACEMENT_UNDERPRICED" ? "EVM.ERR_REPLACEMENT_UNDERPRICED" :
            error.code === "TRANSACTION_REPLACED" ? "EVM.ERR_TRANSACTION_REPLACED" :
            error.code === "UNCONFIGURED_NAME" ? "EVM.ERR_UNCONFIGURED_NAME" :
            error.code === "OFFCHAIN_FAULT" ? "EVM.ERR_OFFCHAIN_FAULT" :
            error.code === "ACTION_REJECTED" ? "EVM.ERR_ACTION_REJECTED" :
            "EVM.ERR_UNKNOWN";
        let data: Option<unknown> = None;
        let message: Option<unknown> = None;
        let transaction: Option<unknown> = None;
        let reason: Option<unknown> = None;
        if ("data" in error) data = Some(error.data);
        if ("message" in error) data = Some(error.message);
        if ("transaction" in error) data = Some(error.transaction);
        if ("reason" in error) data = Some(error.reason);
        return { code, data, message, transaction, reason };
    }
}

export namespace EthereumVirtualMachine {
    export type Result<T1> = Result$0<T1, Error>;

    export type Error = {
        code: ErrorCode;
        data: Option<unknown>;
        message: Option<unknown>;
        transaction: Option<unknown>;
        reason: Option<unknown>;
    };

    export type ErrorCode =
        | "EVM.ERR_MALFORMED_SIGNATURE"

        /// Generic
        | "EVM.ERR_UNKNOWN"
        | "EVM.ERR_NOT_IMPLEMENTED"
        | "EVM.ERR_UNSUPPORTED_OPERATION"
        | "EVM.ERR_NETWORK_FAULT"
        | "EVM.ERR_SERVER_FAULT"
        | "EVM.ERR_TIMEOUT"
        | "EVM.ERR_BAD_DATA"
        | "EVM.ERR_CANCELLED"
        | "EVM.ERR_INVALID_RESPONSE"

        /// Operational
        | "EVM.ERR_BUFFER_OVERRUN"
        | "EVM.ERR_NUMERIC_FAULT"

        /// Argument
        | "EVM.ERR_INVALID_ARGUMENT"
        | "EVM.ERR_MISSING_ARGUMENT"
        | "EVM.ERR_UNEXPECTED_ARGUMENT"

        /// Blockchain
        | "EVM.ERR_CALL_EXCEPTION"
        | "EVM.ERR_INSUFFICIENT_FUNDS"
        | "EVM.ERR_NONCE_EXPIRED"
        | "EVM.ERR_REPLACEMENT_UNDERPRICED"
        | "EVM.ERR_TRANSACTION_REPLACED"
        | "EVM.ERR_UNCONFIGURED_NAME"
        | "EVM.ERR_OFFCHAIN_FAULT"

        /// User Interaction
        | "EVM.ERR_ACTION_REJECTED";

    export type TransactionResponse = TransactionResponse$0;

    export type TransactionReceipt = TransactionReceipt$0;

    export type Transaction<T1 extends Payload = Payload> =
        | Query<T1>
        | Touch<T1>
        | Deployment<T1>;

    export type Query<T1 extends Payload = Payload> = {
        privateKey: string;
        to: EthereumVirtualMachine.Address;
        signature: NonNeutralSignature;
        payload?: T1;
    };

    export type Touch<T1 extends Payload = Payload> = {
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
    
    export type Deployment<T1 extends Payload = Payload> = {
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

    export type Payload = Array<unknown>;

    export type NonNeutralSignature = Exclude<Signature, EventSignature>;

    export type Signature =
        | EventSignature
        | ExternalPureSignature
        | ExternalViewSignature
        | ExternalSignature;

    export type SignatureBuilderResult<T1> = Result$0<T1, SignatureBuilderErrorCode>;

    export type SignatureBuilderErrorCode =
        | "SIGNATURE_BUILDER.ERR_MISSING_NAME"
        | "SIGNATURE_BUILDER.ERR_MISSING_TYPE"
        | "SIGNATURE_BUILDER.ERR_MALFORMED_SIGNATURE";

    export type SignatureBuilder = {
        name(name: string): SignatureBuilder;
        event(): SignatureBuilder;
        external(): SignatureBuilder;
        pure(): SignatureBuilder;
        view(): SignatureBuilder;
        payload(...data: Array<Data>): SignatureBuilder;
        returns(...data: Array<Data>): SignatureBuilder;
        build(): SignatureBuilderResult<Signature>;
    };

    export function SignatureBuilder(): SignatureBuilder {
        let _this: SignatureBuilder;
        let _name: Option<string>;
        let _type: Option<"event" | "external">;
        let _visibility: Option<"pure" | "view">;
        let _payload: Option<Array<Data>>;
        let _returns: Option<Array<Data>>;
        
        /***/ {
            _this = {
                name,
                event,
                external,
                pure,
                view,
                payload,
                returns,
                build
            };
            _name = None;
            _type = None;
            _visibility = None;
            _payload = None;
            _returns = None;
            return _this;
        }

        function name(name: string): SignatureBuilder {
            _name = Some(name);
            return _this;
        }

        function event(): SignatureBuilder {
            _type = Some<"event">("event");
            return _this;
        }

        function external(): SignatureBuilder {
            _type = Some<"external">("external");
            return _this;
        }

        function pure(): SignatureBuilder {
            _visibility = Some<"pure">("pure");
            return _this;
        }

        function view(): SignatureBuilder {
            _visibility = Some<"view">("view");
            return _this;
        }

        function payload(...data: Array<Data>): SignatureBuilder {
            _payload = Some(data);
            return _this;
        }

        function returns(...data: Array<Data>): SignatureBuilder {
            _returns = Some(data);
            return _this;
        }

        function build(): SignatureBuilderResult<Signature> {
            if (_name.none()) return Err("SIGNATURE_BUILDER.ERR_MISSING_NAME");
            let name: string = _name.unwrap();
            if (_type.none()) return Err("SIGNATURE_BUILDER.ERR_MISSING_TYPE");
            let type: "event" | "external" = _type.unwrap();
            if (type === "event") {
                let selector: Selector = Selector.from(name, ..._payload.unwrapOr([]));
                let signature: EventSignature = EventSignature.from(selector);
                return Ok(signature);
            }
            if (type === "external") {
                let selector: Selector = Selector.from(name, ..._payload.unwrapOr([]));
                if (_visibility.none()) {
                    let signature: ExternalSignature = ExternalSignature.from(selector);
                    return Ok(signature);
                }
                let visibility: "pure" | "view" = _visibility.unwrap();
                if (visibility === "pure") {
                    let signature: ExternalPureSignature = ExternalPureSignature.from(selector, ..._returns.unwrapOr([]));
                    return Ok(signature);
                }
                if (visibility === "view") {
                    let signature: ExternalViewSignature = ExternalViewSignature.from(selector, ..._returns.unwrapOr([]));
                    return Ok(signature);
                }
            }
            return Err("SIGNATURE_BUILDER.ERR_MALFORMED_SIGNATURE");
        }
    }

    export type SignatureHandler = {
        nameOf(signature: Signature): Option<string>;
    };

    export const SignatureHandler: SignatureHandler = (() => {
        /***/ {
            return { nameOf };
        }

        function nameOf(signature: Signature): Option<string> {
            let shards: Array<string> = signature.split(" ");
            if (shards.length === 0) return None;
            let string: Option<string> = flag(shards.at(1));
            if (string.none()) return string;
            let string$0: string = string.unwrap();
            let result: Option<string> = flag(
                string$0
                    .split("(")
                    .at(0)
            );
            if (result.none()) return result;
            let result$0: string = result.unwrap();
            return Some(result$0);
        }
    })();

    export type EventSignature = `event ${ string }(${ string })`;

    export type EventSignatureHandler = {
        from(selector: Selector): EventSignature;
    };

    export const EventSignature: EventSignatureHandler = (() => {
        /***/ {
            return { from };
        }

        function from(selector: Selector): EventSignature {
            return `event ${ selector }`;
        }
    })();

    export type ExternalPureSignature = `function ${ string }(${ string }) external pure returns (${ string })`;

    export type ExternalPureSignatureHandler = {
        from(selector: Selector, ...data: Array<Data>): ExternalPureSignature;
    };

    export const ExternalPureSignature: ExternalPureSignatureHandler = (() => {
        /***/ {
            return { from };
        }

        function from(selector: Selector, ...data: Array<Data>): ExternalPureSignature {
            return `function ${ selector } external pure returns (${ String.from(...data) })`;
        }
    })();

    export type ExternalViewSignature = `function ${ string }(${ string }) external view returns (${ string })`;

    export type ExternalViewSignatureHandler = {
        from(selector: Selector, ...data: Array<Data>): ExternalViewSignature;
    };

    export const ExternalViewSignature: ExternalViewSignatureHandler = (() => {
        /***/ {
            return { from };
        }

        function from(selector: Selector, ...data: Array<Data>): ExternalViewSignature {
            return `function ${ selector } external view returns (${ String.from(...data) })`;
        }
    })();


    export type ExternalSignature = `function ${ string }(${ string }) external`;

    export type ExternalSignatureHandler = {
        from(selector: Selector): ExternalSignature;
    };

    export const ExternalSignature: ExternalSignatureHandler = (() => {
        /***/ {
            return { from };
        }

        function from(selector: Selector): ExternalSignature {
            return `function ${ selector } external`;
        }
    })();


    export type Selector = `${ string }(${ string })`;

    export type SelectorHandler = {
        from(name: string, ...data: Array<Data>): Selector; 
    };

    export const Selector: SelectorHandler = (() => {
        /***/ {
            return { from };
        }

        function from(name: string, ...data: Array<Data>): Selector {
            return `${ name }(${ String.from(...data) })`;
        }
    })();


    export type String = {
        from(...data: Array<Data>): string;
    };

    export const String: String = (() => {
        /***/ {
            return { from };
        }

        function from(...data: Array<Data>): string {
            let result: string = "";
            for (let i: bigint = 0n; i < data.length; i ++) {
                if (i !== 0n) result = ", ";
                result += data[Number(i)];
            }
            return result;
        }
    })();

    export type StructData = Array<Data>;

    export type Data =
        | ArithmeticData
        | BytesData
        | AddressData
        | BooleanData
        | StringData
        | ArrayData
        | StructData;

    export type ArrayData = `${ 
        | ArithmeticData 
        | BytesData 
        | AddressData 
        | BooleanData 
        | StringData }[]`;

    export type AddressData = "address";

    export type BooleanData = "bool";

    export type StringData = "string";

    export type ArithmeticData = "uint" | "int" | `${ "uint" | "int" }${ ArithmeticDataBitSize }`;

    export type ArithmeticDataBitSize = 
    | "8" 
    | "16" | "24" | "32" 
    | "40" | "48" | "56" 
    | "64" | "72" | "80" 
    | "88" | "96" 
    | "104" | "112" | "120" 
    | "128" | "136" | "144" 
    | "152" | "160" | "168" 
    | "176" | "184" | "192" 
    | "200" | "208" | "216" 
    | "224" | "232" | "240" 
    | "248" | "256";

    export type BytesData = "bytes" | `bytes${ BytesDataBitSize }`;

    export type BytesDataBitSize = 
        | "1" | "2" | "3" 
        | "4" | "5" | "6" 
        | "7" | "8" | "9" 
        | "10" | "11" | "12" 
        | "13" | "14" | "15" 
        | "16" | "17" | "18" 
        | "19" | "20" | "21" 
        | "22" | "23" | "24" 
        | "25" | "26" | "27" 
        | "28" | "29" | "30" 
        | "31" | "32";

    export type AbstractBinaryInterface = Array<Signature> | Array<object>;

    export type Bytecode = string;

    export type Address = `0x${ string }`;
}