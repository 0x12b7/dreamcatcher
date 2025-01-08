import type { MathErrorCode } from "@root";

export type MathError = {
    code: MathErrorCode;
    message: string;
};

export function MathError(_instance: MathError): MathError {
    
    /** @constructor */ {
        return _instance;
    }
}