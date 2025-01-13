import * as Root from "@root";

/** @script */
Root.I8(500n).expect("Should not throw an error");
Root.I8(-255n).expect("");
Root.I8(50000000000000000000000000n).expectErr("");
Root.I8(-5000000000000000000000000n).expectErr("");