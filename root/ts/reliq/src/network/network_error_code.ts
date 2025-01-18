import { type StatusCode } from "./status_code";

type NetworkResponseCode =
    | StatusCode[keyof StatusCode];