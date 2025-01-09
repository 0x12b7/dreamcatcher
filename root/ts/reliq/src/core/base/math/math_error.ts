import type { MathErrorCode } from "@root";
import { Option } from "@root";

export type MathError<T1 extends MathErrorCode> = {
    code: T1;
    message: Option<string>;
};

export function MathError<T1 extends MathErrorCode>(_instance: MathError<T1>): MathError<T1> {
    
    /** @constructor */ {
        return _instance;
    }
}