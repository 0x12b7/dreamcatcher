import type { Arithmetic } from "@core.vm.ethereum";
import type { Bytes } from "@core.vm.ethereum";
import type { Base } from "@core.vm.ethereum";

export type Array = `${ Arithmetic | Bytes | Base }[]`;