import { Fpv } from "@root";

testMul();
testDiv();

function testMul(): void {
    let decimals: bigint = 18n;
    let x: bigint = Fpv.Calculator
        .convert(200n, 2n, decimals)
        .expect()
        .unwrap();
    let y: bigint = Fpv.Calculator
        .convert(700n, 2n, decimals)
        .expect()
        .unwrap();
    let z: bigint = Fpv.Calculator
        .mul(x, y, decimals)
        .expect()
        .unwrap();
    console.log(
        Fpv.Calculator
            .convert(z, decimals, 2n)
            .expect()
            .unwrap()
    );
    return;
}

function testDiv(): void {
    let decimals: bigint = 18n;
    let x: bigint = Fpv.Calculator
        .convert(200n, 2n, decimals)
        .expect()
        .unwrap();
    let y: bigint = Fpv.Calculator
        .convert(700n, 2n, decimals)
        .expect()
        .unwrap();
    let z: bigint = Fpv.Calculator
        .div(x, y, decimals)
        .expect()
        .unwrap();
    console.log(
        Fpv.Calculator
            .convert(z, decimals, 2n)
            .expect()
            .unwrap()
    );
    return;
}