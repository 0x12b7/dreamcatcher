import type { Arithmetic } from "src/vm/ethereum/mod";
import type { Bytes } from "src/vm/ethereum/mod";
import type { Base } from "src/vm/ethereum/mod";

export type Array = `${ Arithmetic | Bytes | Base }[]`;