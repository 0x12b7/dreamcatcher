import type { ArithmeticData } from "./arithmetic_data";
import type { BytesData } from "./bytes_data";
import type { AddressData } from "./address_data";
import type { BooleanData } from "./boolean_data";
import type { StringData } from "./string_data";
import type { ArrayData } from "./array_data";
import type { StructData } from "./struct_data";

export type Data =
    | ArithmeticData
    | BytesData
    | AddressData
    | BooleanData
    | StringData
    | ArrayData
    | StructData;