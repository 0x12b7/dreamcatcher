import type { NetworkErrorCode } from "@root"
import type { NetworkErrorContext } from "@root"
import { Error } from "@root"

export type NetworkError = Error<NetworkErrorCode, NetworkErrorContext>;