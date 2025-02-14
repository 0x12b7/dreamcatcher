import { Unsafe, Option, Fpv, Result } from '@tokyo/reliq';
import { TransactionResponse, TransactionReceipt } from 'ethers';

type _Result$0<T1, T2> = Result<T1, T2>;
type _TransactionResponse$0 = TransactionResponse;
type _TransactionReceipt$0 = TransactionReceipt;
type Wallet = {
    use(account: Wallet.Address): Promise<Wallet.Result<Wallet>>;
    use(account: bigint): Promise<Wallet.Result<Wallet>>;
    use(account: Wallet.Address | bigint): Promise<Wallet.Result<Wallet>>;
    connected(): boolean;
    connected(address: Wallet.Address): Promise<Wallet.Result<boolean>>;
    connected(address?: Wallet.Address): Promise<Wallet.Result<boolean>> | boolean;
    address(): Promise<Wallet.Result<Wallet.Address>>;
    nonce(): Promise<Wallet.Result<bigint>>;
    query<T1 = unknown, T2 extends Wallet.Payload<T1> = Wallet.Payload<T1>>(transaction: Wallet.Query<T1, T2>): Promise<Wallet.Result<Unsafe>>;
    touch<T1 = unknown, T2 extends Wallet.Payload<T1> = Wallet.Payload<T1>>(transaction: Wallet.Touch<T1, T2>): Promise<Wallet.Result<Option<Wallet.TransactionReceipt>>>;
    deploy<T1 = unknown, T2 extends Wallet.Payload<T1> = Wallet.Payload<T1>>(transaction: Wallet.Deployment<T1, T2>): Promise<Wallet.Result<Wallet.Address>>;
};
declare function Wallet(): Promise<Wallet.Result<Wallet>>;
declare namespace Wallet {
    type Result<T1> = _Result$0<T1, Error>;
    type Error = {
        code: ErrorCode;
        data: Option<unknown>;
        message: Option<unknown>;
        transaction: Option<unknown>;
        reason: Option<unknown>;
    };
    type ErrorCode = `${Brand}.ERR_MALFORMED_SIGNATURE` | `${Brand}.ERR_UNKNOWN` | `${Brand}.ERR_NOT_IMPLEMENTED` | `${Brand}.ERR_UNSUPPORTED_OPERATION` | `${Brand}.ERR_NETWORK_FAULT` | `${Brand}.ERR_SERVER_FAULT` | `${Brand}.ERR_TIMEOUT` | `${Brand}.ERR_BAD_DATA` | `${Brand}.ERR_CANCELLED` | `${Brand}.ERR_INVALID_RESPONSE` | `${Brand}.ERR_BUFFER_OVERRUN` | `${Brand}.ERR_NUMERIC_FAULT` | `${Brand}.ERR_INVALID_ARGUMENT` | `${Brand}.ERR_MISSING_ARGUMENT` | `${Brand}.ERR_UNEXPECTED_ARGUMENT` | `${Brand}.ERR_CALL_EXCEPTION` | `${Brand}.ERR_INSUFFICIENT_FUNDS` | `${Brand}.ERR_NONCE_EXPIRED` | `${Brand}.ERR_REPLACEMENT_UNDERPRICED` | `${Brand}.ERR_TRANSACTION_REPLACED` | `${Brand}.ERR_UNCONFIGURED_NAME` | `${Brand}.ERR_OFFCHAIN_FAULT` | `${Brand}.ERR_ACTION_REJECTED`;
    type Brand = "WALLET";
    type TransactionResponse = _TransactionResponse$0;
    type TransactionReceipt = _TransactionReceipt$0;
    type Transaction<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> = Query<T1, T2> | Touch<T1, T2> | Deployment<T1, T2>;
    type Query<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> = {
        to: Address;
        signature: NonAmbientSignature;
        payload?: T2;
    };
    type Touch<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> = {
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
    type Deployment<T1 = unknown, T2 extends Payload<T1> = Payload<T1>> = {
        bytecode: Bytecode;
        abi: AbstractBinaryInterface;
        payload?: T2;
        gasPrice?: Fpv.Compatible<18n>;
        gasLimit?: Fpv.Compatible<18n>;
        amount?: Fpv.Compatible<18n>;
        chainId?: bigint;
        confirmations?: bigint;
    };
    type Payload<T1 = unknown> = Array<T1>;
    type NonAmbientSignature = Exclude<Signature, EventSignature>;
    type Signature = EventSignature | ExternalPureSignature | ExternalViewSignature | ExternalSignature;
    type SignatureHandler = {
        nameOf(signature: Signature): Option<string>;
    };
    const Signature: SignatureHandler;
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
    function SignatureBuilder(): SignatureBuilder;
    namespace SignatureBuilder {
        type Result<T1> = _Result$0<T1, ErrorCode>;
        type ErrorCode = "SIGNATURE_BUILDER.ERR_MISSING_NAME" | "SIGNATURE_BUILDER.ERR_MISSING_TYPE" | "SIGNATURE_BUILDER.ERR_MALFORMED_SIGNATURE";
    }
    type ExternalSignature = `function ${string}(${string}) external`;
    type ExternalSignatureHandler = {
        from(selector: Selector): ExternalSignature;
    };
    const ExternalSignature: ExternalSignatureHandler;
    type ExternalViewSignature = `function ${string}(${string}) external view returns (${string})`;
    type ExternalViewSignatureHandler = {
        from(selector: Selector, ...data: Array<Data>): ExternalViewSignature;
    };
    const ExternalViewSignature: ExternalViewSignatureHandler;
    type ExternalPureSignature = `function ${string}(${string}) external pure returns (${string})`;
    type ExternalPureSignatureHandler = {
        from(selector: Selector, ...data: Array<Data>): ExternalPureSignature;
    };
    const ExternalPureSignature: ExternalPureSignatureHandler;
    type EventSignature = `event ${string}(${string})`;
    type EventSignatureHandler = {
        from(selector: Selector): EventSignature;
    };
    const EventSignature: EventSignatureHandler;
    type Selector = `${string}(${string})`;
    type SelectorHandler = {
        from(name: string, ...data: Array<Data>): Selector;
    };
    const Selector: SelectorHandler;
    type ArrayData = `${ArithmeticData | BytesData | AddressData | BooleanData | StringData}[]`;
    type Data = ArithmeticData | BytesData | AddressData | BooleanData | StringData | ArrayData | StructData;
    type DataHandler = {
        serialize(...data: Array<Data>): string;
    };
    const Data: DataHandler;
    type StructData = Array<Data>;
    type BooleanData = "bool";
    type AddressData = "address";
    type StringData = "string";
    type BytesData = "bytes" | `bytes${BytesDataBitSize}`;
    type BytesDataBitSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32";
    type ArithmeticData = "uint" | "int" | `${"uint" | "int"}${ArithmeticDataBitSize}`;
    type ArithmeticDataBitSize = "8" | "16" | "24" | "32" | "40" | "48" | "56" | "64" | "72" | "80" | "88" | "96" | "104" | "112" | "120" | "128" | "136" | "144" | "152" | "160" | "168" | "176" | "184" | "192" | "200" | "208" | "216" | "224" | "232" | "240" | "248" | "256";
    type AbstractBinaryInterface = Array<Signature> | Array<object>;
    type Bytecode = string;
    type Address = `0x${string}`;
}

export { Wallet };
