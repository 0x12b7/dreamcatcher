import type { ContractMethod } from "ethers";
import type { TransactionResponse } from "ethers";
import { Contract } from "ethers";
import type { TransactionReceipt } from "ethers";
import { BrowserProvider } from "ethers";
import { JsonRpcSigner } from "ethers";
import { Unsafe } from "reliq";
import { Option } from "reliq";
import { Result } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Fpv } from "reliq";
import { flag } from "reliq";
import { wrap } from "reliq";
import { wrapAsync } from "reliq";

type _Result$0<T1, T2> = Result<T1, T2>;

type _TransactionResponse$0 = TransactionResponse;

type _TransactionReceipt$0 = TransactionReceipt;

export type Wallet = {
    use(account: Wallet.Address): Promise<>;
    use(account: bigint): Promise<>;
    use(account: Wallet.Address | bigint): Promise<>;
    connected(): boolean;
    connected(address: Wallet.Address): boolean;
    connected(address?: Wallet.Address): boolean;
    address(): Promise<Option<string>>;
    nonce(): Promise<Option<bigint>>;
    query<T1 = unknown, T2 extends Wallet.Payload<T1> = Wallet.Payload<T1>>(transaction: Wallet.Query<T1, T2>): Promise<Wallet.Result<Unsafe>>;
    touch<T1 = unknown, T2 extends Wallet.Payload<T1> = Wallet.Payload<T1>>(transaction: Wallet.Touch<T1, T2>): Promise<Wallet.Result<Option<Wallet.TransactionReceipt>>>;
    deploy<T1 = unknown, T2 extends Wallet.Payload<T1> = Wallet.Payload<T1>>(transaction: Wallet.Deployment<T1, T2>): Promise<Wallet.Result<Wallet.Address>>;
    disconnect(): Promise<Wallet.Result<void>>;
}

export async function Wallet(): Promise<Wallet.Result<Wallet>> {
    let _socket: BrowserProvider;
    let _accounts: Array<string>;
    let _signer: Option<JsonRpcSigner> = None;

    /***/ {
        return (await _connect()).map(([socket, accounts]) => {
            _socket = socket;
            _accounts = accounts;
            return {
                address,
                nonce
            };
        });
    }

    async function address(): Promise<Option<string>> {
        return (await wrapAsync(async () => {
            return (await _socket.getSigner()).getAddress();
        }))
        .toOption();
    }

    async function nonce(): Promise<Option<bigint>> {
        return (await wrapAsync(async () => {
            return (await _socket.getSigner()).getNonce();
        }))
        .toOption()
        .map(nonce => {
            return BigInt(nonce);
        });
    }

    async function query<T1 = unknown, T2 extends Wallet.Payload<T1> = Wallet.Payload<T1>>(transaction: Wallet.Query<T1, T2>): Promise<Wallet.Result<Unsafe>> {
        let signer: JsonRpcSigner;
        if (_signer.none()) {
            let signer$0: Wallet.Result<JsonRpcSigner> = await _map(wrapAsync(async () => {
                return await _socket.getSigner();
            }));
            if (signer$0.err()) return signer$0;
            let signer$1: JsonRpcSigner = signer$0.unwrap();
            signer = signer$1;
        }
        else {
            signer = _signer.unwrap();
        }
        let contract: Wallet.Result<Contract> = _map(wrap(() => {
            return new Contract(transaction.to, [transaction.signature], signer);
        }));
        if (contract.err()) return contract;
        let contract$0: Contract = contract.unwrap();
        let contractMethod: Wallet.Result<ContractMethod> = _map(wrap(() => {
            return contract$0.getFunction(transaction.signature);
        }));
        if (contractMethod.err()) return contractMethod;
        let contractMethod$0: ContractMethod = contractMethod.unwrap();
        let response: Wallet.Result<Unsafe> = await _map(wrapAsync(async () => {
            return Unsafe(await contractMethod$0(...transaction.payload ?? []));
        }));
        if (response.err()) return response;
        let response$0: Unsafe = response.unwrap();
        return Ok(response$0);
    }

    

    async function _connect(): Promise<Wallet.Result<[BrowserProvider, Array<string>]>> {
        if (window === undefined) return Err({
            code: "WALLET.ERR_UNSUPPORTED_OPERATION",
            data: None,
            message: Some("Wallet: ..."),
            reason: None,
            transaction: None
        });
        if (("ethereum" in window) === false) return Err({
            code: "WALLET.ERR_UNSUPPORTED_OPERATION",
            data: None,
            message: Some("Wallet: ..."),
            reason: None,
            transaction: None
        });
        let socket: Wallet.Result<BrowserProvider> = _map(wrap(() => {
            return new BrowserProvider((window as any).ethereum);
        }));
        if (socket.err()) return socket;
        let socket$0: BrowserProvider = socket.unwrap();
        let accounts: Wallet.Result<Array<string>> = await _map(wrapAsync(async () => {
            return socket$0.send("eth_accounts", []);
        }));
        if (accounts.err()) return accounts;
        let accounts$0: Array<string> = accounts.unwrap();
        if (accounts$0.length > 0) return Ok<[BrowserProvider, Array<string>]>([socket$0, accounts$0]);
        let accounts$1: Wallet.Result<Array<string>> = await _map(wrapAsync(async () => {
            return socket$0.send("eth_requestAccounts", []);
        }));
        if (accounts$1.err()) return accounts$1;
        let accounts$2: Array<string> = accounts$1.unwrap();
        if (accounts$2.length > 0) return Ok<[BrowserProvider, Array<string>]>([socket$0, accounts$2]);
        return Err({
            code: "WALLET.ERR_UNCONFIGURED_NAME",
            data: None,
            message: None,
            reason: None,
            transaction: None
        });
    }

    function _map<T1>(result: Promise<_Result$0<T1, Unsafe>>): Promise<Wallet.Result<T1>>;
    function _map<T1>(result: _Result$0<T1, Unsafe>): Wallet.Result<T1>;
    function _map<T1>(unsafe: Unsafe): Wallet.Error;
    function _map<T1>(
        p0:
            | Promise<_Result$0<T1, Unsafe>>
            | _Result$0<T1, Unsafe>
            | Unsafe
    ):
        | Promise<Wallet.Result<T1>>
        | Wallet.Result<T1>
        | Wallet.Error {
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
            && typeof e == "object"
            && "code" in e
            && typeof e.code === "string"
        )) return {
            code: "WALLET.ERR_UNKNOWN",
            data: None,
            message: None,
            reason: None,
            transaction: None
        };
        let map: Record<string, Wallet.ErrorCode | undefined> = {
            "UNKNOWN_ERROR": "WALLET.ERR_UNKNOWN",
            "NOT_IMPLEMENTED": "WALLET.ERR_NOT_IMPLEMENTED",
            "UNSUPPORTED_OPERATION": "WALLET.ERR_UNSUPPORTED_OPERATION",
            "NETWORK_ERROR": "WALLET.ERR_NETWORK_FAULT",
            "SERVER_ERROR": "WALLET.ERR_SERVER_FAULT",
            "TIMEOUT": "WALLET.ERR_TIMEOUT",
            "BAD_DATA": "WALLET.ERR_BAD_DATA",
            "CANCELLED": "WALLET.ERR_CANCELLED",
            "BUFFEER_OVERRUN": "WALLET.ERR_BUFFER_OVERRUN",
            "NUMERIC_FAULT": "WALLET.ERR_NUMERIC_FAULT",
            "INVALID_ARGUMENT": "WALLET.ERR_INVALID_ARGUMENT",
            "INVALID_RESPONSE": "WALLET.ERR_INVALID_RESPONSE",
            "MISSSING_ARGUMENT": "WALLET.ERR_MISSING_ARGUMENT",
            "UNEXPECTED_ARGUMENT": "WALLET.ERR_UNEXPECTED_ARGUMENT",
            "CALL_EXCEPTION": "WALLET.ERR_CALL_EXCEPTION",
            "INSUFFICIEENT_FUNDS": "WALLET.ERR_INSUFFICIENT_FUNDS",
            "NONCE_EXPIRED": "WALLET.ERR_NONCE_EXPIRED",
            "REPLACEMENT_UNDERPRICED": "WALLET.ERR_REPLACEMENT_UNDERPRICED",
            "TRANSACTION_REPLACED": "WALLET.ERR_TRANSACTION_REPLACED",
            "UNCONFIGURED_NAME": "WALLET.ERR_UNCONFIGURED_NAME",
            "OFFCHAIN_FAULT": "WALLET.ERR_OFFCHAIN_FAULT",
            "ACTION_REJECTED": "WALLET.ERR_ACTION_REJECTED"
        };
        let code: Wallet.ErrorCode = map[e.code] ?? "WALLET.ERR_UNKNOWN";
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

export namespace Wallet {
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

    export type Brand = "WALLET";

    export type TransactionResponse = _TransactionResponse$0;

    export type TransactionReceipt = _TransactionReceipt$0;

    export type Transaction<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> =
        | Query<T1, T2>
        | Touch<T1, T2>
        | Deployment<T1, T2>;

    export type Query<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> = {
        to: Address;
        signature: NonAmbientSignature;
        payload?: T2;
    };

    export type Touch<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> = {
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