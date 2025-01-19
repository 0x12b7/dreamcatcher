import type { Result } from "@root";
import { Error } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Some } from "@root";
import { None } from "@root";
import type { Serializable } from "@root";

export type StackTraceLineErrorCode =
    | "STACK_TRACE_LINE.ERR_LOCATION_UNAVAILABLE"
    | "STACK_TRACE_LINE.ERR_PATH_UNAVAILABLE"
    | "STACK_TRACE_LINE.ERR_LINE_NUMBER_UNAVAILABLE"
    | "STACK_TRACE_LINE.ERR_COLUMN_NUMBER_UNAVAILABLE";

export type StackTraceLineError = Error<StackTraceLineErrorCode>;

export type StackTraceLine = 
    & Serializable 
    & {
    location(): string;
    path(): string;
    line(): bigint;
    column(): bigint;
};

export function StackTraceLine(_line: string): Result<StackTraceLine, StackTraceLineError> {
    let _location: string;
    let _path: string;
    let _line$: bigint;
    let _column: bigint;

    /** @constructor */ {
        let sections: Array<string> = _line.split(" ");
        let location: string | null = sections.at(0) || null;
        let path: string | null = sections.at(1) || null;
        let lineR: Result<[bigint, bigint], StackTraceLineError> = _parseLine(_line);
        if (lineR.err()) return lineR;
        _line$ = lineR.unlock()[0];
        _column = lineR.unlock()[1];

        if (!location) return Err(Error({
            code: "STACK_TRACE_LINE.ERR_LOCATION_UNAVAILABLE",
            message: Some(
                "Unable to parse location."
            ),
            payload: None
        }));
        if (!path) return Err(Error({
            code: "STACK_TRACE_LINE.ERR_PATH_UNAVAILABLE",
            message: Some(
                "Unable to parse path."
            ),
            payload: None
        }));

    }

    /**
     * 
     * ```ts
     *  43 |> 
     * ```
     * 
     */
    function toString(): string {
        
    }

    function _parseLine(path: string): Result<[bigint, bigint], StackTraceLineError> {
        let shards: Array<string> = [];
        let string: string = "";
        shards = path
            .replaceAll("(", "")
            .replaceAll(")", "")
            .split("/");
        string = shards.at(shards.length - 1) || "";
        if (!string) return Err(Error({
            code: "STACK_TRACE_LINE.ERR_COLUMN_NUMBER_UNAVAILABLE",
            message: Some("Column number unavailable."),
            payload: None
        }));
        shards = string.split(":") || [];
        let last0: string = shards.at(shards.length - 1) || "";
        let last1: string = shards.at(shards.length - 2) || "";
        if (!last0) return Err(Error({
            code: "STACK_TRACE_LINE.ERR_COLUMN_NUMBER_UNAVAILABLE",
            message: Some("Column number unavailable."),
            payload: None
        }));
        if (!last1) return Err(Error({
            code: "STACK_TRACE_LINE.ERR_LINE_NUMBER_UNAVAILABLE",
            message: Some("Line number unavailable."),
            payload: None
        }));
        return Ok([BigInt(last0), BigInt(last1)]);
    }
}

StackTraceLine("at someFunction (/path/to/file.js:10:15)")