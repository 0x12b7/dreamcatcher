import { 
    INTERNAL_ERROR_MESSAGE 
} from "@root";
import {
    Float,
    I8,
    I16,
    I32,
    I64,
    I128,
    I256,
    U8,
    U16,
    U32,
    U64,
    U128,
    U256 
} from "@root";

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
export const MAX_I_256: I256 = I256(MAX_256).expect("Invalid maximum I256 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_I_256: I256 = I256(MIN_256).expect("Invalid minimum I256 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_I_128: I128 = I128(MAX_128).expect("Invalid maximum I128 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_I_128: I128 = I128(MIN_128).expect("Invalid minimum I128 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_I_64: I64 = I64(MAX_64).expect("Invalid maximum I64 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_I_64: I64 = I64(MIN_64).expect("Invalid minimum I64 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_I_32: I32 = I32(MAX_32).expect("Invalid maximum I32 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_I_32: I32 = I32(MIN_32).expect("Invalid minimum I32 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_I_16: I16 = I16(MAX_16).expect("Invalid maximum I16 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_I_16: I16 = I16(MIN_16).expect("Invalid minimum I16 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_I_8: I8 = I8(MAX_8).expect("Invalid maximum I8 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_I_8: I8 = I8(MIN_8).expect("Invalid minimum I8 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_U_256: U256 = U256(MAX_256).expect("Invalid maximum U256 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_U_256: U256 = U256(0).expect("Invalid minimum U256 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_U_128: U128 = U128(MAX_128).expect("Invalid maximum U128 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_U_128: U128 = U128(0).expect("Invalid minimum U128 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_U_64: U64 = U64(MAX_64).expect("Invalid maximum U64 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_U_64: U64 = U64(0).expect("Invalid minimum U64 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_U_32: U32 = U32(MAX_32).expect("Invalid maximum U32 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_U_32: U32 = U32(0).expect("Invalid minimum U32 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_U_16: U16 = U16(MAX_16).expect("Invalid maximum U16 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_U_16: U16 = U16(0).expect("Invalid minimum U16 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_U_8: U8 = U8(MAX_8).expect("Invalid maximum U8 constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_U_8: U8 = U8(0).expect("Invalid minimum U8 constant." + INTERNAL_ERROR_MESSAGE);
export const MAX_NUMBER: number = Number.MAX_SAFE_INTEGER;
export const MIN_NUMBER: number = Number.MIN_SAFE_INTEGER;
export const MAX_FLOAT: Float = Float(MAX_NUMBER).expect("Invalid maximum float constant." + INTERNAL_ERROR_MESSAGE);
export const MIN_FLOAT: Float = Float(MIN_NUMBER).expect("Invalid minimum float constant." + INTERNAL_ERROR_MESSAGE);