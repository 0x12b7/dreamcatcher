import { Fpv } from "@root";

testMul();
testDiv();
testPercentageOf();
testYield();

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
        "[testMul]",
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
        "[testDiv]",
        Fpv.Calculator
            .convert(z, decimals, 2n)
            .expect()
            .unwrap()
    );
    return;
}

function testPercentageOf(): void {
    let decimals: bigint = 18n;
    let x: bigint = Fpv.Calculator
        .convert(200n, 2n, decimals)
        .expect()
        .unwrap();
    let y: bigint = Fpv.Calculator
        .convert(1500n, 2n, decimals)
        .expect()
        .unwrap();
    let z: bigint = Fpv.Calculator
        .percentageOf(x, y, decimals)
        .expect()
        .unwrap();
    console.log(
        "[testPercentageOf]",
        Fpv.Calculator
            .convert(z, decimals, 2n)
            .expect()
            .unwrap()
    );
    return;
}

function testYield(): void {
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
        .yield(x, y, decimals)
        .expect()
        .unwrap();
    console.log(
        "[testYield]",
        x,
        y,
        Fpv.Calculator
            .convert(z, decimals, 2n)
            .expect()
            .unwrap()
    );
}

function t() {    
    console.log(
        Fpv.Calculator
            .loss(2_5000000000n, 1_2400000000n, 10n)
            .expect()
            .convert(2n)
            .expect()
            .unwrap()
    );
    return;
}

t();