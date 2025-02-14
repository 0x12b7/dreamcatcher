import { 
    Unsafe,
    Option,
    Result,
    Some,
    None,
    Ok,
    Err,
    Fpv,
    flag,
    wrap,
    wrapAsync
} from "@tokyo/reliq";
import { 
    type BaseContract,
    type ContractMethod,
    type TransactionResponse,
    type TransactionReceipt,
    Contract,
    ContractFactory,
    Interface,
    JsonRpcProvider,
    Wallet
} from "ethers";

type _Result$0<T1, T2> = Result<T1, T2>;

type _TransactionResponse$0 = TransactionResponse;

type _TransactionReceipt$0 = TransactionReceipt;

export type EthereumVirtualMachine = {
    query<T1 = unknown, T2 extends EthereumVirtualMachine.Payload<T1> = EthereumVirtualMachine.Payload<T1>>(transaction: EthereumVirtualMachine.Query<T1, T2>): Promise<EthereumVirtualMachine.Result<Unsafe>>;
    touch<T1 = unknown, T2 extends EthereumVirtualMachine.Payload<T1> = EthereumVirtualMachine.Payload<T1>>(transaction: EthereumVirtualMachine.Touch<T1, T2>): Promise<EthereumVirtualMachine.Result<Option<EthereumVirtualMachine.TransactionReceipt>>>;
    deploy<T1 = unknown, T2 extends EthereumVirtualMachine.Payload<T1> = EthereumVirtualMachine.Payload<T1>>(transaction: EthereumVirtualMachine.Deployment<T1, T2>): Promise<EthereumVirtualMachine.Result<EthereumVirtualMachine.Address>>;
};

export function EthereumVirtualMachine(_url: string): EthereumVirtualMachine.Result<EthereumVirtualMachine> {
    let _jsonRpcProvider: JsonRpcProvider;

    /** @constructor */ {
        let jsonRpcProvider: EthereumVirtualMachine.Result<JsonRpcProvider> = _map(wrap(() => {
            return new JsonRpcProvider(_url);
        }));
        if (jsonRpcProvider.err()) return jsonRpcProvider;
        _jsonRpcProvider = jsonRpcProvider.unwrap();
        return Ok({ query, touch, deploy });
    }

    async function query<T1 = unknown, T2 extends EthereumVirtualMachine.Payload<T1> = EthereumVirtualMachine.Payload<T1>>(transaction: EthereumVirtualMachine.Query<T1, T2>): Promise<EthereumVirtualMachine.Result<Unsafe>> {
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

    async function touch<T1 = unknown, T2 extends EthereumVirtualMachine.Payload<T1> = EthereumVirtualMachine.Payload<T1>>(transaction: EthereumVirtualMachine.Touch<T1, T2>): Promise<EthereumVirtualMachine.Result<Option<EthereumVirtualMachine.TransactionReceipt>>> {
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
        let name: Option<string> = EthereumVirtualMachine.Signature.nameOf(transaction.signature);
        if (name.none()) return Err({
            code: "ETHEREUM_VIRTUAL_MACHINE.ERR_MALFORMED_SIGNATURE",
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
            code: "ETHEREUM_VIRTUAL_MACHINE.ERR_INVALID_RESPONSE",
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

    async function deploy<T1 = unknown, T2 extends EthereumVirtualMachine.Payload<T1> = EthereumVirtualMachine.Payload<T1>>(transaction: EthereumVirtualMachine.Deployment<T1, T2>): Promise<EthereumVirtualMachine.Result<EthereumVirtualMachine.Address>> {        
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

    function _map<T1>(result: Promise<_Result$0<T1, Unsafe>>): Promise<EthereumVirtualMachine.Result<T1>>;
    function _map<T1>(result: _Result$0<T1, Unsafe>): EthereumVirtualMachine.Result<T1>;
    function _map<T1>(unsafe: Unsafe): EthereumVirtualMachine.Error;
    function _map<T1>(
        p0: 
            | Promise<_Result$0<T1, Unsafe>>
            | _Result$0<T1, Unsafe> 
            | Unsafe
    ): 
        | Promise<EthereumVirtualMachine.Result<T1>>
        | EthereumVirtualMachine.Result<T1> 
        | EthereumVirtualMachine.Error {
        if ("then" in p0) {
            let result: Promise<_Result$0<T1, Unsafe>> = p0;
            return result.then(result$0 => {
                return _map(result$0);
            });
        }
        if ("ok" in p0) {
            let result: _Result$0<T1, Unsafe> = p0;
            return result.mapErr(e => {
                return _map(e);
            });
        }
        let unsafe: Unsafe = p0;
        let e: unknown = unsafe.inspect();
        if (!(
            e !== null
            && e !== undefined
            && typeof e === "object"
            && "code" in e
            && typeof e.code === "string"
        )) return {
            code: "ETHEREUM_VIRTUAL_MACHINE.ERR_UNKNOWN",
            data: None,
            message: None,
            transaction: None,
            reason: None
        };
        let code: EthereumVirtualMachine.ErrorCode =
            e.code === "UNKNOWN_ERROR" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_UNKNOWN" :
            e.code === "NOT_IMPLEMENTED" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_NOT_IMPLEMENTED" :
            e.code === "UNSUPPORTED_OPERATION" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_UNSUPPORTED_OPERATION" :
            e.code === "NETWORK_ERROR" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_NETWORK_FAULT" :
            e.code === "SERVER_ERROR" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_SERVER_FAULT" :
            e.code === "TIMEOUT" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_TIMEOUT" :
            e.code === "BAD_DATA" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_BAD_DATA" :
            e.code === "CANCELLED" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_CANCELLED" :
            e.code === "BUFFER_OVERRUN" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_BUFFER_OVERRUN" :
            e.code === "NUMERIC_FAULT" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_NUMERIC_FAULT" :
            e.code === "INVALID_ARGUMENT" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_INVALID_ARGUMENT" :
            e.code === "MISSING_ARGUMENT" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_MISSING_ARGUMENT" :
            e.code === "UNEXPECTED_ARGUMENT" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_UNEXPECTED_ARGUMENT" :
            e.code === "CALL_EXCEPTION" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_CALL_EXCEPTION" : 
            e.code === "INSUFFICIENT_FUNDS" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_INSUFFICIENT_FUNDS" :
            e.code === "NONCE_EXPIRED" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_NONCE_EXPIRED" :
            e.code === "REPLACEMENT_UNDERPRICED" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_REPLACEMENT_UNDERPRICED" :
            e.code === "TRANSACTION_REPLACED" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_TRANSACTION_REPLACED" :
            e.code === "UNCONFIGURED_NAME" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_UNCONFIGURED_NAME" :
            e.code === "OFFCHAIN_FAULT" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_OFFCHAIN_FAULT" :
            e.code === "ACTION_REJECTED" ? "ETHEREUM_VIRTUAL_MACHINE.ERR_ACTION_REJECTED" :
            "ETHEREUM_VIRTUAL_MACHINE.ERR_UNKNOWN";
        let data: Option<unknown> = None;
        let message: Option<unknown> = None;
        let transaction: Option<unknown> = None;
        let reason: Option<unknown> = None;
        if ("data" in e) data = Some(e.data);
        if ("message" in e) data = Some(e.message);
        if ("transaction" in e) data = Some(e.transaction);
        if ("reason" in e) data = Some(e.reason);
        return { code, data, message, transaction, reason };
    }
}

export namespace EthereumVirtualMachine {
    export type Result<T1> = _Result$0<T1, Error>;

    export type Error = {
        code: ErrorCode;
        data: Option<unknown>;
        message: Option<unknown>;
        transaction: Option<unknown>;
        reason: Option<unknown>;
    };

    export type ErrorCode =
        | `${ Brand }.ERR_MALFORMED_SIGNATURE`

        /// Generic
        | `${ Brand }.ERR_UNKNOWN`
        | `${ Brand }.ERR_NOT_IMPLEMENTED`
        | `${ Brand }.ERR_UNSUPPORTED_OPERATION`
        | `${ Brand }.ERR_NETWORK_FAULT`
        | `${ Brand }.ERR_SERVER_FAULT`
        | `${ Brand }.ERR_TIMEOUT`
        | `${ Brand }.ERR_BAD_DATA`
        | `${ Brand }.ERR_CANCELLED`
        | `${ Brand }.ERR_INVALID_RESPONSE`

        /// Operational
        | `${ Brand }.ERR_BUFFER_OVERRUN`
        | `${ Brand }.ERR_NUMERIC_FAULT`

        /// Argument
        | `${ Brand }.ERR_INVALID_ARGUMENT`
        | `${ Brand }.ERR_MISSING_ARGUMENT`
        | `${ Brand }.ERR_UNEXPECTED_ARGUMENT`

        /// Blockchain
        | `${ Brand }.ERR_CALL_EXCEPTION`
        | `${ Brand }.ERR_INSUFFICIENT_FUNDS`
        | `${ Brand }.ERR_NONCE_EXPIRED`
        | `${ Brand }.ERR_REPLACEMENT_UNDERPRICED`
        | `${ Brand }.ERR_TRANSACTION_REPLACED`
        | `${ Brand }.ERR_UNCONFIGURED_NAME`
        | `${ Brand }.ERR_OFFCHAIN_FAULT`

        /// User Interaction
        | `${ Brand }.ERR_ACTION_REJECTED`;

    export type Brand = "ETHEREUM_VIRTUAL_MACHINE";

    export type TransactionResponse = _TransactionResponse$0;

    export type TransactionReceipt = _TransactionReceipt$0;

    export type Transaction<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> =
        | Query<T1, T2>
        | Touch<T1, T2>
        | Deployment<T1, T2>;

    export type Query<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> = {
        privateKey: string;
        to: Address;
        signature: NonAmbientSignature;
        payload?: T2;
    };

    export type Touch<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> = {
        privateKey: string;
        to: Address;
        signature: NonAmbientSignature;
        payload?: T2;
        gasPrice?: Fpv.Compatible<18n>;
        gasLimit?: Fpv.Compatible<18n>;
        amount?: Fpv.Compatible<18n>;
        chainId?: bigint;
        timeout?: bigint;
        confirmations?: bigint;
    };
    
    export type Deployment<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> = {
        privateKey: string;
        bytecode: Bytecode;
        abi: AbstractBinaryInterface;
        payload?: T2;
        gasPrice?: Fpv.Compatible<18n>;
        gasLimit?: Fpv.Compatible<18n>;
        amount?: Fpv.Compatible<18n>;
        chainId?: bigint;
        confirmations?: bigint;
    };

    export type Payload<T1 = unknown> = Array<T1>;

    export type NonAmbientSignature = Exclude<Signature, EventSignature>;

    export type Signature =
        | EventSignature
        | ExternalPureSignature
        | ExternalViewSignature
        | ExternalSignature;

    export type SignatureHandler = {
        nameOf(signature: Signature): Option<string>;
    };

    export const Signature: SignatureHandler = (() => {
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

    export type SignatureBuilder = {
        name(name: string): SignatureBuilder;
        event(): SignatureBuilder;
        external(): SignatureBuilder;
        pure(): SignatureBuilder;
        view(): SignatureBuilder;
        payload(...data: Array<Data>): SignatureBuilder;
        returns(...data: Array<Data>): SignatureBuilder;
        build(): SignatureBuilder.Result<Signature>;
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
    
        function build(): SignatureBuilder.Result<Signature> {
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
    
    export namespace SignatureBuilder {
        export type Result<T1> = _Result$0<T1, ErrorCode>;
    
        export type ErrorCode =
            | "SIGNATURE_BUILDER.ERR_MISSING_NAME"
            | "SIGNATURE_BUILDER.ERR_MISSING_TYPE"
            | "SIGNATURE_BUILDER.ERR_MALFORMED_SIGNATURE";
    }

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

    export type ExternalViewSignature = `function ${ string }(${ string }) external view returns (${ string })`;

    export type ExternalViewSignatureHandler = {
        from(selector: Selector, ...data: Array<Data>): ExternalViewSignature;
    };

    export const ExternalViewSignature: ExternalViewSignatureHandler = (() => {
        /***/ {
            return { from };
        }
    
        function from(selector: Selector, ...data: Array<Data>): ExternalViewSignature {
            return `function ${ selector } external view returns (${ Data.serialize(...data) })`;
        }
    })();

    export type ExternalPureSignature = `function ${ string }(${ string }) external pure returns (${ string })`;

    export type ExternalPureSignatureHandler = {
        from(selector: Selector, ...data: Array<Data>): ExternalPureSignature;
    };

    export const ExternalPureSignature: ExternalPureSignatureHandler = (() => {
        /** @constructor */ {
            return { from };
        }
    
        function from(selector: Selector, ...data: Array<Data>): ExternalPureSignature {
            return `function ${ selector } external pure returns (${ Data.serialize(...data) })`;
        }
    })();

    export type EventSignature = `event ${ string }(${ string })`;

    export type EventSignatureHandler = {
        from(selector: Selector): EventSignature;
    };

    export const EventSignature: EventSignatureHandler = (() => {
        /** @constructor */ {
            return { from };
        }
    
        function from(selector: Selector): EventSignature {
            return `event ${ selector }`;
        }
    })();

    export type Selector = `${ string }(${ string })`;

    export type SelectorHandler = {
        from(name: string, ...data: Array<Data>): Selector; 
    };

    export const Selector: SelectorHandler = (() => {
        /** @constructor */ {
            return { from };
        }
        
        function from(name: string, ...data: Array<Data>): Selector {
            return `${ name }(${ Data.serialize(...data) })`;
        }
    })();

    export type ArrayData = `${ 
        | ArithmeticData 
        | BytesData 
        | AddressData 
        | BooleanData 
        | StringData }[]`;

    export type Data =
        | ArithmeticData
        | BytesData
        | AddressData
        | BooleanData
        | StringData
        | ArrayData
        | StructData;

    export type DataHandler = {
        serialize(...data: Array<Data>): string;
    };

    export const Data: DataHandler = (() => {
        /** @constructor */ {
            return { serialize };
        }

        function serialize(...data: Array<Data>): string {
            let result: string = "";
            for (let i: bigint = 0n; i < data.length; i ++) {
                if (i !== 0n) result = ", ";
                result += data[Number(i)];
            }
            return result;
        }
    })();

    export type StructData = Array<Data>;

    export type BooleanData = "bool";

    export type AddressData = "address";

    export type StringData = "string";

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

    export type AbstractBinaryInterface = Array<Signature> | Array<object>;

    export type Bytecode = string;

    export type Address = `0x${ string }`;
}