import { I } from "@root";
import { I8 } from "@root";
import { I16 } from "@root";
import { I32 } from "@root";
import { I64 } from "@root";
import { I128 } from "@root";
import { I256 } from "@root";
import { U } from "@root";
import { U8 } from "@root";
import { U16 } from "@root";
import { U32 } from "@root";
import { U64 } from "@root";
import { U128 } from "@root";
import { U256 } from "@root";

export const MAX_256: bigint = 2n**256n - 1n;
export const MIN_256: bigint = - MAX_256;
export const MAX_128: bigint = 2n**128n - 1n;
export const MIN_128: bigint = - MAX_128;
export const MAX_64: bigint = 2n**64n - 1n;
export const MIN_64: bigint = - MAX_64;
export const MAX_32: bigint = 2n**32n - 1n;
export const MIN_32: bigint = - MAX_32;
export const MAX_16: bigint = 2n**16n - 1n;
export const MIN_16: bigint = - MAX_16;
export const MAX_8: bigint = 2n**8n - 1n;
export const MIN_8: bigint = - MAX_8;
export const MAX_I256: I256 = I256(MAX_256);
export const MIN_I256: I256 = I256(MIN_256);
export const MAX_I128: I128 = I128(MAX_128);
export const MIN_I128: I128 = I128(MIN_128);


export const MAX_NUMBER: number = Number.MAX_SAFE_INTEGER;
export const MIN_NUMBER: number = Number.MIN_SAFE_INTEGER;