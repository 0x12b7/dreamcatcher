import type { None } from "@root"

export type DeAlloc = 
    & None
    & {
    deAlloc(): void;
};

export function DeAlloc(): DeAlloc {

}



DeAlloc()