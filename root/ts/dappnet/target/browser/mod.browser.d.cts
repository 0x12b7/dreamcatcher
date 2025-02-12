import { Option, Result } from 'reliq';

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

export { type AddressData, type ArithmeticData, type ArithmeticDataBitSize, type ArrayData, type BooleanData, type BytesData, type BytesDataBitSize, type Data, EventSignature, type EventSignatureHandler, ExternalPureSignature, type ExternalPureSignatureHandler, ExternalSignature, type ExternalSignatureHandler, ExternalViewSignature, type ExternalViewSignatureHandler, type NonAmbientSignature, Selector, type SelectorHandler, Signature, SignatureBuilder, type SignatureHandler, type StringData, type StructData };
