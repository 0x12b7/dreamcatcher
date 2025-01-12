export function toString(unknown: unknown): string {
    if (unknown === null || unknown === undefined || typeof unknown !== "object") return String(unknown);
    try {
        return JSON.stringify(unknown);
    }
    catch {}
    return "[object Object]";
}