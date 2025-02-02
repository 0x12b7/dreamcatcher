import type { NetworkErrorCode } from "@core"
import { Error } from "@core"

export type NetworkError = Error<NetworkErrorCode, bigint>;