import { Result } from "reliq";

export type Account = {
    address(): Promise<Result<string, unknown>>;
    nonce(): Promise<Result<bigint, unknown>>;
    nextNonce(): Promise<Result<bigint, unknown>>;
};
export function Account(_key: string) {
    
}