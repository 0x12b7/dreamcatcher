

{
    let precision: bigint = 2n;
    let representation: bigint = 10n ** precision;
    let n: bigint = 3200n;
    let x: bigint = n;
    let y: bigint = (x + 1n * representation) / 2n;
    while (y < x) {
        x = y;
        y = (x + n / x) / 2n;
    }
    console.log(x);
}