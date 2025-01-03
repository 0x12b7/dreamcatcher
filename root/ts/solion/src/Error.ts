import type { CompilerError } from "@root";
import { SourceLocation } from "@root";

export type Error = {
    sourceLocation?: SourceLocation;
    type: CompilerError;
    component: string;
    severity: "error" | "warning";
    message: string;
    formattedMessage?: string;
};

export function Error(_instance: Error): Error {
    /***/ {
        return _instance;
    }
}