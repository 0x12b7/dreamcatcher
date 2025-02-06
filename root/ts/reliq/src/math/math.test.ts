import { Fpv } from "@root";

console.log(
    Fpv(5000n)
        .expect()
        .sqrt()
        .expect()
        .unwrap()
);

console.log(
    Fpv(5000n)
        .expect()
        .lerp(10000n, 5000n)
        .unwrap()
);