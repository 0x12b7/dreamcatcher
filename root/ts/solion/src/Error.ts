import type { CompilerE } from "@$";
import { SourceLocation } from "@$";

export type Error = {
    sourceLocation?: SourceLocation;
    type: CompilerE;
    component: string;
    severity: "error" | "warning";
    message: string;
    formattedMessage?: string;
};
export function Error($: Error): Error {
    /***/ {
        return $;
    }
}