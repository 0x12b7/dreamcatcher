export type DynWrapper = {
    deAlloc(): void;
    alloc(): void;
    forceAlloc(): void;
};