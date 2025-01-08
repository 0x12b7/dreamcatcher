import type { MathErrorCode } from "@root";
import { Option } from "@root";

export type MathError = {
    code: MathErrorCode;
    message: Option<string>;
};

export function MathError<T1 extends MathErrorCode>(_instance: MathError): MathError {
    /** @constructor */ {
        return _instance;
    }
}