import { I8 } from "@root";
import { I16 } from "@root";
import { I32 } from "@root";
import { I64 } from "@root";
import { I128 } from "@root";
import { I256 } from "@root";
import { I } from "@root";



const MAX_256: bigint = 2n**256n - 1n;
const MIN_256: bigint = -MAX_256;
const MAX_128: bigint = 2n**128n - 1n;
const MIN_128: bigint = -MIN_256;
const MAX_64: bigint = 2n**64n - 1n;
const MIN_64: bigint = -MAX_64;
const MAX_32: bigint = 2n**32n - 1n;
const MIN_32: bigint = -MAX_32;
const MAX_16: bigint = 2n**16n - 1n;
const MIN_16: bigint = -MAX_16;
const MAX_8: bigint = 2n**8n - 1n;
const MIN_8: bigint = -MAX_8;
const MAX_I_256: I256 = I256(MAX_256).expect("Invalid I256 constant.");
const MIN_I_256: I256 = I256(MIN_256).expect("Invalid I256 constant.");
const MAX_I_128: I128 = I128(MAX_128).expect("Invalid I128 constant.");
const MIN_I_128: I128 = I128(MIN_128).expect("Invalid I128 constant.");
const MAX_I_64: I64 = I64(MAX_64).expect("Invalid I64 constant.");
const MIN_I_64: I64 = I64(MIN_64).expect("Invalid I64 constant.");
const MAX_I_32: I32 = I32(MAX_32).expect("Invalid I32 constant.");
const MIN_I_32: I32 = I32(MIN_32).expect("Invalid I32 constant.");
const MAX_I_16: I16 = I16(MAX_16).expect("Invalid I16 constant.");
const MIN_I_16: I16 = I16(MIN_16).expect("Invalid I16 constant.");
const MAX_I_8: I8 = I8(MAX_8).expect("Invalid I8 constant.");
const MIN_I_8: I8 = I8(MIN_8).expect("Invalid I8 constant.");



const MAX_NUMBER: number = Number.MAX_SAFE_INTEGER; ///  2**53 - 1
const MIN_NUMBER: number = Number.MIN_SAFE_INTEGER; /// -2**53 - 1