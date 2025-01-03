import type { EvmArithmeticDataType } from "@root";
import type { EvmBaseDataType } from "@root";
import type { EvmArrayDataType } from "@root";
import type { EvmStructDataType } from "@root";
import type { EvmDataTypeHandler } from "@root";

export type EvmDataType =
    | EvmArithmeticDataType
    | EvmBaseDataType
    | EvmArrayDataType
    | EvmStructDataType;

export const EvmDataType: EvmDataTypeHandler = (() => {
    /** @constructor */ {
        return { toString };
    }

    function toString(... args: Array<EvmDataType>): string {
        let result: string = "";
        let i: bigint = 0n;
        while (i < args.length) {
            if (i !== 0n) result = ", ";
            result += args[Number(i)];
            i++
        }
        return result;
    }
})();