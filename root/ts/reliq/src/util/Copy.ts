export function copy<T1>(v: T1): T1 {
    return structuredClone(v);
}