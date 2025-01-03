import { SourceOutput } from "@root";
import { ContractOutput } from "@root";
import { Error } from "@root";

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

export function Output(_instance: Output): Output {
    /** @constructor */ {
        return _instance;
    }
}