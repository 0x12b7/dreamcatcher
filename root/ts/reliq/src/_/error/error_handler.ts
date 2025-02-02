import type { Option } from "@root";
import type { Closure } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { Error as CustomError } from "@root";
import { isBrandedStruct } from "@root";
import { allO } from "@root";

export type ErrorHandler = {
    matchError(unknown: unknown): unknown is CustomError<any, unknown>;
    matchError(unknown: unknown, task: Closure<[e: CustomError<any, unknown>], void>): unknown is CustomError<any, unknown>;
    matchError<T1 extends string>(unknown: unknown, code: T1): unknown is CustomError<T1, unknown>;
    matchError<T1 extends string>(unknown: unknown, code: T1, task: Closure<[e: CustomError<any, unknown>], void>): unknown is CustomError<T1, unknown>;
    localStackTrace(location: Function): Option<string>;
    parseStackTrace(locationOrStack: Function | string): string;
    convertToStandardError<T1 extends string, T2 = unknown>(e: CustomError<T1, T2>): Error;
};

export const ErrorHandler: ErrorHandler = (() => {
    /** @constructor */ {
        return {
            matchError,
            localStackTrace,
            parseStackTrace,
            convertToStandardError
        };
    }

    function matchError(unknown: unknown): unknown is CustomError<any, unknown>;
    function matchError(unknown: unknown, task: Closure<[e: CustomError<any, unknown>], void>): unknown is CustomError<any, unknown>;
    function matchError<T1 extends string>(unknown: unknown, code: T1): unknown is CustomError<T1, unknown>;
    function matchError<T1 extends string>(unknown: unknown, code: T1, task: Closure<[e: CustomError<any, unknown>], void>): unknown is CustomError<T1, unknown>;
    function matchError<T1 extends string>(
        p0: unknown,
        p1?: T1 | Closure<[e: CustomError<any, unknown>], void>,
        p2?: Closure<[e: CustomError<any, unknown>], void>
    ): p0 is CustomError<T1, unknown> {
        let unknown: unknown = p0;
        let match: boolean =
            unknown !== null
            && unknown !== undefined
            && typeof unknown === "object"
            && isBrandedStruct(unknown, "Error");
        if (!match) return false;
        if (p1 !== undefined && typeof p1 === "string") {
            let code: string = p1;
            match =
                match
                && "code" in (unknown as any)
                && typeof (unknown as any).code === "string"
                && (unknown as any).code === code;   
        }
        if (!match) return false;
        let taskO: Option<Closure<[e: CustomError<any, unknown>], void>> = None;
        if (p1 !== undefined && typeof p1 === "function") taskO = Some(p1);
        if (p2 !== undefined) taskO = Some(p2);
        taskO.map(task => {
            task((unknown as CustomError<any, unknown>));
            return;
        });
        return true;
    }

    function localStackTrace(location: Function): Option<string> {
        let e: Error = Error();
        Error.captureStackTrace(e, location);
        if (e.stack) return Some(e.stack);
        return None;
    }

    function parseStackTrace(locationOrStack: Function | string): string {
        return _parseStack(_parsePayload(locationOrStack));
    }

    function convertToStandardError<T1 extends string, T2 = unknown>(e: CustomError<T1, T2>): Error {
        let eStandard: Error = Error();
        eStandard.name = e.code;
        eStandard.message = e.message.unlockOr("");
        eStandard.stack = e.stack.toString();
        eStandard.cause = undefined;
        return eStandard;
    }

    function _parsePayload(payload: Function | string): string {
        if (typeof payload === "string") return payload;
        return localStackTrace(payload).unlockOr("");
    }

    function _parseStack(stack: string): string {
        let result: string = "";
        stack
            .split("\n")
            .map(line => {
                return _matchLine<string>(
                    line, 
                    line => {
                        return line.trim();
                    },
                    __ => {
                        return "";
                    }
                );
            })
            .filter(line => {
                return line.length > 0;
            })
            .map(line => {
                return _parseLine(line);
            })
            .map(([locationO, pathO, lineO, columnO]) => {
                return _representLine(locationO, pathO, lineO, columnO);
            })
            .forEach(line => {
                result += "\n" + line;
                return;
            });
        return result;
    }

    function _parseLine(line: string): [location: Option<string>, path: Option<string>, line: Option<bigint>, column: Option<bigint>] {
        let locationO: Option<string> = None;
        let pathO: Option<string> = None;
        let lineO: Option<bigint> = None;
        let columnO: Option<bigint> = None;
        let pattern: RegExp = /at (?<location>.*?) \((?<path>.*?):(?<line>\d+):(?<column>\d+)\)/;
        let match: RegExpExecArray | null = pattern.exec(line);
        if (match && match.groups) {
            locationO = match.groups.location ? Some(match.groups.location) : None;
            pathO = match.groups.path ? Some(match.groups.path) : None;
            lineO = match.groups.line ? Some(BigInt(match.groups.line)) : None;
            columnO = match.groups.column ? Some(BigInt(match.groups.column)) : None;
        }
        return [locationO, pathO, lineO, columnO];
    }

    function _representLine(locationO: Option<string>, pathO: Option<string>, lineO: Option<bigint>, columnO: Option<bigint>): string {
        let symbol: string = "at";
        let missing: string = "<<< UNAVAILABLE >>>";
        return allO(locationO, pathO, lineO, columnO)
            .map(([location, path, line, column]) => {
                return `     ${ _red(symbol) } ${ path } ${ _red(location) } ${ line } ${ column }`;
            })
            .unlockOr("     " + _red(missing));
    }

    function _matchLine<T1>(line: string, onValid: Closure<[line: string], T1>, onInvalid: Closure<[line: string], T1>): T1 {
        if (line === "Error") return onInvalid(line);
        return onValid(line);
    }

    function _red(string: string): string {
        return "\x1b[31m" + string + "\x1b[0m";
    }
})();