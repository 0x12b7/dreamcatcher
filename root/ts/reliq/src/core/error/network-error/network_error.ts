import type { NetworkErrorCode } from "@root"
import { Error } from "@root"

export type NetworkError = Error<NetworkErrorCode, bigint>;