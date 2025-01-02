export function copy<T>(v: T): T {
    return structuredClone(v);
}