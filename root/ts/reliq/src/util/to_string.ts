export function toString(x: unknown): string {
    let result: string = String(x);
    if (result === "[object Object]") 
        try {
            result = JSON.stringify(x);
        }
        catch {}
    return result;
}