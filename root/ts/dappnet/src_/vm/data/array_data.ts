import type { ArithmeticData } from "./arithmetic_data";
import type { BytesData } from "./bytes_data";
import type { AddressData } from "./address_data";
import type { BooleanData } from "./boolean_data";
import type { StringData } from "./string_data";

export type ArrayData = `${ 
    | ArithmeticData 
    | BytesData 
    | AddressData 
    | BooleanData 
    | StringData }[]`;