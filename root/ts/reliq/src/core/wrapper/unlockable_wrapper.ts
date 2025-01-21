
export type UnlockableWrapper<T1> = {
    unlockOr<T2>(fallback: T2): T1 | T2;
    and(__: unknown): T1;
    map(__: unknown): T1;
    
};