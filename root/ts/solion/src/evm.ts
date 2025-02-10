
export type Evm = {

};

export function Evm() {

}

export namespace Evm {
    export type Signature =
        | EventSignature
        | ExternalPureSignature
        | ExternalViewSignature
        | ExternalSignature;
    
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

    export type Bytecode = string;
}