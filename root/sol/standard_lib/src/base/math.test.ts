import { 
    Fpv
} from "@tokyo/reliq";

function testPercentageOf() {
    let x: bigint = Fpv.Calculator
        .cst(250n, 2n, 18n)
        .expect()
        .unwrap();
    let y: bigint = Fpv.Calculator
        .cst(750n, 2n, 18n)
        .expect()
        .unwrap();
    let z: bigint = Fpv.Calculator
        .cst(percentageOf(x, y), 18n, 2n)
        .expect()
        .unwrap();
    console.log(z);

    function percentageOf(x: Fpv.Compatible<18n>, y: Fpv.Compatible<18n>): bigint {
        let x$0: bigint = Fpv.Calculator.unwrap(x);
        let y$0: bigint = Fpv.Calculator.unwrap(y);
        let z: bigint = Fpv.Calculator
            .div(x$0, y$0, 18n)
            .expect("Failed to divide `x` by `y`.")
            .unwrap();
        console.log(
            Fpv.Calculator
                .cst(z, 18n, 2n)
                .expect()
                .unwrap()
        )
        let representation: bigint = 100n * (10n**18n);
        return Fpv.Calculator
            .mul(z, representation, 18n)
            .expect("Failed to multiply product `z` by `representation`.")
            .unwrap();
    }
}

testPercentageOf();