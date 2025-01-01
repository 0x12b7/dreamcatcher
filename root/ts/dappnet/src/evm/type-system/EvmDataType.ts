import type { EvmArithmetic } from "@$";
import type { EvmBase } from "@$";
import type { EvmArray } from "@$";
import type { EvmStruct } from "@$";
import type { EvmDataTypeHandler } from "@$";

export type EvmDataType = 
    | EvmArithmetic 
    | EvmBase 
    | EvmArray 
    | EvmStruct;

export const EvmDataType: EvmDataTypeHandler = (() => {
    /***/ {
        return { toString };
    }

    function toString(... args: Array<EvmDataType>): string {
        let result: string = "";
        let i: bigint = 0n;
        while (i < args.length) {
            if (i !== 0n) result = ", ";
            result += args[Number(i)];
            i++;
        }
        return result;
    }
})();