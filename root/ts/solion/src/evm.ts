import { Err, flag, Ok, Option, Unsafe, wrap, wrapAsync } from "reliq";
import { Result } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { Fpv } from "reliq";
import { JsonRpcProvider, N } from "ethers";
import { Wallet } from "ethers";
import { Contract } from "ethers";
import type { ContractMethod } from "ethers";
import { Interface } from "ethers";
import type { TransactionReceipt } from "ethers";
import type { TransactionResponse } from "ethers";

type Result$0<T1, T2> = Result<T1, T2>;

export type Evm = {
    query<T1 extends Evm.Payload>(transaction: Evm.Query<T1>): Promise<Evm.Result<Unsafe>>;
    touch<T1 extends Evm.Payload>(transaction: Evm.Touch<T1>): Promise<Evm.Result<Evm.TransactionReceipt>>;
    deploy<T1 extends Evm.Payload>(transaction: Evm.Deployment<T1>): Promise<Evm.Result<Evm.Address>>;
};

export function Evm(_url: string): Evm.Result<Evm> {
    let _jsonRpcProvider: JsonRpcProvider;

    /***/ {
        let jsonRpcProvider: Result$0<JsonRpcProvider, Unsafe> = wrap(() => {
            return new JsonRpcProvider(_url);
        });
        if (jsonRpcProvider.err()) return jsonRpcProvider.mapErr(e => {
            return _resolveUnsafeError(e);
        });
        _jsonRpcProvider = jsonRpcProvider.unwrap();
        return Ok({ query, touch });
    }

    async function query<T1 extends Evm.Payload>(transaction: Evm.Query<T1>): Promise<Evm.Result<Unsafe>> {
        let wallet: Result$0<Wallet, Evm.Error> = wrap(() => {
            return new Wallet(transaction.privateKey, _jsonRpcProvider);
        }).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (wallet.err()) return wallet;
        let wallet$0: Wallet = wallet.unwrap();
        let contract: Result$0<Contract, Evm.Error> = wrap(() => {
            return new Contract(transaction.to, [transaction.signature], wallet$0);
        }).mapErr(e => {
            return _resolveUnsafeError(e);
        })
        if (contract.err()) return contract;
        let contract$0: Contract = contract.unwrap();
        let contractMethod: Result$0<ContractMethod, Evm.Error> = wrap(() => {
            return contract$0.getFunction(transaction.signature);
        }).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (contractMethod.err()) return contractMethod;
        let contractMethod$0: ContractMethod = contractMethod.unwrap();
        let response: Result$0<Unsafe, Evm.Error> = (await wrapAsync(async () => {
            return await contractMethod$0(transaction.payload ?? [])
        })).map(response => {
            return Unsafe(response);
        }).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (response.err()) return response;
        let response$0: Unsafe = response.unwrap();
        return Ok(response$0);
    }

    async function touch<T1 extends Evm.Payload>(transaction: Evm.Touch<T1>): Promise<Evm.Result<Evm.TransactionReceipt>> {
        let wallet: Result$0<Wallet, Evm.Error> = wrap(() => {
            return new Wallet(transaction.privateKey, _jsonRpcProvider);
        }).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (wallet.err()) return wallet;
        let wallet$0: Wallet = wallet.unwrap();
        let address: Result$0<Evm.Address, Evm.Error> = (await wrapAsync(async () => {
            return await wallet$0.getAddress();
        })).map(address => {
            return address;
        }).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (address.err()) return address;
        let address$0: Evm.Address = address.unwrap();
        let nonce: Result$0<bigint, Evm.Error> = (await wrapAsync(async () => {
            return await wallet$0.getNonce();
        })).map(nonce => {
            return BigInt(nonce);
        }).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (nonce.err()) return nonce;
        let nonce$0: bigint = nonce.unwrap();
        let intf: Result$0<Interface, Evm.Error> = wrap(() => {
            return new Interface([transaction.signature]);
        }).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (intf.err()) return intf;
        let intf$0: Interface = intf.unwrap();
        let name: Option<string> = Evm.SignatureHandler.nameOf(transaction.signature);
        if (name.none()) return Err({
            code: "EVM.ERR_MALFORMED_SIGNATURE",
            data: None,
            message: None,
            reason: None,
            transaction: None
        });
        let name$0: string = name.unwrap();
        let data: Result$0<string, Evm.Error> = wrap(() => {
            return intf$0.encodeFunctionData(name, transaction.payload);
        }).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (data.err()) return data;
        let data$0: string = data.unwrap();
        let gasPrice: bigint = transaction.gasPrice ? Fpv.Calculator.unwrap(transaction.gasPrice) : 0n;
        let gasLimit: bigint = transaction.gasLimit ? Fpv.Calculator.unwrap(transaction.gasLimit) : 0n;
        let response: Result$0<TransactionReceipt | null, Evm.Error> = (await wrapAsync(async () => {
            return await wallet$0.sendTransaction({
                from: address$0,
                to: transaction.to,
                nonce: nonce$0,
                gasPrice: gasPrice,
                gasLimit: gasLimit,
                data: data$0
        })})).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (response.err()) return response;
        let response$0: TransactionResponse | null = response.unwrap();
        if (response$0 === null) return Err({
            code: "EVM.ERR_INVALID_RESPONSE",
            data: None,
            message: None,
            transaction: None,
            reason: None
        });
        let receipt: Result$0<TransactionReceipt | null, Evm.Error> = (await wrapAsync(async () => {
            return await response$0.wait(Number(transaction.confirmations), Number(transaction.timeout));
        })).mapErr(e => {
            return _resolveUnsafeError(e);
        });
        if (receipt.err()) return receipt;
        let receipt$0: TransactionReceipt = receipt.unwrap();
        return Ok(receipt$0);
    }

    function _resolveUnsafeError(u: Unsafe): Evm.Error {
        let e: unknown = u.inspect();
        if (!(
            e !== null
            && e !== undefined
            && typeof e === "object"
            && "code" in e
            && typeof e.code === "string"
        )) return {
            code: "EVM.ERR_UNKNOWN",
            data: None,
            message: None,
            transaction: None,
            reason: None
        };
        let code: Evm.ErrorCode =
            e.code === "UNKNOWN_ERROR" ? "EVM.ERR_UNKNOWN" :
            e.code === "NOT_IMPLEMENTED" ? "EVM.ERR_NOT_IMPLEMENTED" :
            e.code === "UNSUPPORTED_OPERATION" ? "EVM.ERR_UNSUPPORTED_OPERATION" :
            e.code === "NETWORK_ERROR" ? "EVM.ERR_NETWORK_FAULT" :
            e.code === "SERVER_ERROR" ? "EVM.ERR_SERVER_FAULT" :
            e.code === "TIMEOUT" ? "EVM.ERR_TIMEOUT" :
            e.code === "BAD_DATA" ? "EVM.ERR_BAD_DATA" :
            e.code === "CANCELLED" ? "EVM.ERR_CANCELLED" :
            e.code === "BUFFER_OVERRUN" ? "EVM.ERR_BUFFER_OVERRUN" :
            e.code === "NUMERIC_FAULT" ? "EVM.ERR_NUMERIC_FAULT" :
            e.code === "INVALID_ARGUMENT" ? "EVM.ERR_INVALID_ARGUMENT" :
            e.code === "MISSING_ARGUMENT" ? "EVM.ERR_MISSING_ARGUMENT" :
            e.code === "UNEXPECTED_ARGUMENT" ? "EVM.ERR_UNEXPECTED_ARGUMENT" :
            e.code === "CALL_EXCEPTION" ? "EVM.ERR_CALL_EXCEPTION" : 
            e.code === "INSUFFICIENT_FUNDS" ? "EVM.ERR_INSUFFICIENT_FUNDS" :
            e.code === "NONCE_EXPIRED" ? "EVM.ERR_NONCE_EXPIRED" :
            e.code === "REPLACEMENT_UNDERPRICED" ? "EVM.ERR_REPLACEMENT_UNDERPRICED" :
            e.code === "TRANSACTION_REPLACED" ? "EVM.ERR_TRANSACTION_REPLACED" :
            e.code === "UNCONFIGURED_NAME" ? "EVM.ERR_UNCONFIGURED_NAME" :
            e.code === "OFFCHAIN_FAULT" ? "EVM.ERR_OFFCHAIN_FAULT" :
            e.code === "ACTION_REJECTED" ? "EVM.ERR_ACTION_REJECTED" :
            "EVM.ERR_UNKNOWN";
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

export namespace Evm {
    export type Result<T1> = Result$0<T1, Error>;

    export type Error = {
        code: ErrorCode;
        data: Option<unknown>;
        message: Option<unknown>;
        transaction: Option<unknown>;
        reason: Option<unknown>;
    };

    export type ErrorCode =
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
        | "EVM.ERR_ACTION_REJECTED"

        | "EVM.ERR_MALFORMED_SIGNATURE";


    export type TransactionReceipt = {

    };


    export type Transaction<T1 extends Payload = Payload> =
        | Query<T1>
        | Touch<T1>
        | Deployment<T1>;

    export type Query<T1 extends Payload = Payload> = {
        privateKey: string;
        to: Evm.Address;
        signature: NonNeutralSignature;
        payload?: T1;
    };

    export type Touch<T1 extends Payload = Payload> = {
        privateKey: string;
        to: Evm.Address;
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