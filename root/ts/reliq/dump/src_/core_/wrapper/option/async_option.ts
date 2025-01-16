import type { Option } from "@root";

type AsyncOption<T1> = Promise<Option<T1>>;

export type { AsyncOption };