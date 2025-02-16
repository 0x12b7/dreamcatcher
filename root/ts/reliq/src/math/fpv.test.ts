import { Fpv } from "@root";

let change: string = Fpv.Calculator
    .percentageChange(5_0200050000n, 76_6500000000n, 10n)
    .expect()
    .convert(2n)
    .expect()
    .toNumber()
    .toPrecision(2)
    .toWellFormed() + "%";
console.log(change);