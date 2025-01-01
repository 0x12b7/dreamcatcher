import { SourceOutput } from "@$";
import { ContractOutput } from "@$";
import { Error } from "@$";

export type Output = {
    errors?: Array<Error>;
    sources?: {
        [fileName: string]: SourceOutput;
    };
    contracts?: {
        [fileName: string]: {
            [contract: string]: ContractOutput;
        }
    };
};
export function Output($: Output): Output {
    /***/ {
        return $;
    }
}