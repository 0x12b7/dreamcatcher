import { type Error } from "@root";
import { type StatusCode } from "./status_code";
import { type Option } from "@root";



export type NetworkError =
    & Error<StatusCode[keyof StatusCode]>
    & {
    statusCode: keyof StatusCode;
    url: Option<string>;
};


let e: NetworkError;

e!.statusCode === 404