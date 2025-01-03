export function toString(v: unknown): string {
    let result: string = String(v);
    if (result === "[object Object]") 
        try {
            result = JSON.stringify(v);
        }
        catch {}
    return result;
}