import type { NetworkResponseCode } from "@root";

export type NetworkResponse = {
    code: NetworkResponseCode;
    statusCode: bigint;
};