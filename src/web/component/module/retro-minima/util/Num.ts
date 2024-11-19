

export function prefix(count: number): string {
    return (
        count > 1_000_000_000 ? "B" :
        count > 1_000_000 ? "M" :
        count > 100_000 ? "K" :
        ""
    );
}