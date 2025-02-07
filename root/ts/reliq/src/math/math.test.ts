import { Fpv } from "@root";

console.log(
    Fpv(5000n)
        .expect()
        .sqrt()
        .expect()
        .unwrap()
);

console.log(
    Fpv(695700n, 4n)
        .expect()
        .cst(0n)
        .expect()
        .unwrap()
);