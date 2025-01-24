import { Fpv } from "@root";
import { panic } from "@root";

/** @script */
let value: Fpv = Fpv(2000n).expect("FpvTest: Failed to initialize an Fpv instance with precision 2.");
let result0: Fpv = value.add(2000n);
let result1: Fpv = value.sub(2000n);
let result2: Fpv = value.mul(50n);
let result3: Fpv = value.div(50n).expect("FpvTest: Division by 50n failed unexpectedly.");
if (result0.unwrap() !== 4000n) panic(`FpvTest [add]: Expected 4000n, got ${ result0.unwrap() }.`);
if (result1.unwrap() !== 0n) panic(`FpvTest [sub]: Expected 0n, got ${ result1.unwrap() }`);
if (result2.unwrap() !== 1000n) panic(`FpvTest [mul]: Expected 1000n, got ${ result2.unwrap() }.`);
if (result3.unwrap() !== 4000n) panic(`FpvTest [div]: Expected 4000n, got ${ result3.unwrap() }.`);