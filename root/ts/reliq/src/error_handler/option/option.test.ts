import { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { anyO } from "@root";
import { allO } from "@root";

/** @script */
/// Test [anyO].
let o0: Option<200n> = None;
let o1: Option<201n> = None;
let o2: Option<202n> = Some<202n>(202n);
anyO(o0, o1, o2).expect("[option.test]: Failed to retrieve an expected value.");

/// Test [allO].
let o3: Option<203n> = Some<203n>(203n);
let o4: Option<204n> = Some<204n>(204n);
allO(o2, o3, o4).expect("[option.test]: Failed to retrieve an expected value.");