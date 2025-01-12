import type { OptionBrand } from "@root";
import type { ResultBrand } from "@root";
import type { UnsafeBrand } from "@root";

export type WrapperBrand = 
    | OptionBrand 
    | ResultBrand 
    | UnsafeBrand;