import type { Option } from "@root";
import type { Closure } from "@root";
import type { TypeGuard } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { Error as CustomError } from "@root";
import { isBranded } from "@root";

export type ErrorHandler = {
    matchError<T1 extends string>(unknown: unknown, code: T1): unknown is CustomError<T1, unknown>;
    matchError<T1 extends string>(unknown: unknown, code: T1, task: Closure<[e: CustomError<T1, unknown>], void>): unknown is CustomError<T1, unknown>;
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

    function matchError<T1 extends string>(unknown: unknown, code: T1): unknown is CustomError<T1, unknown>;
    function matchError<T1 extends string>(unknown: unknown, code: T1, task: Closure<[e: CustomError<T1, unknown>], void>): unknown is CustomError<T1, unknown>;
    function matchError<T1 extends string>(unknown: unknown, code: T1, task?: Closure<[e: CustomError<T1, unknown>], void>): unknown is CustomError<T1, unknown> | void {
        let guard: TypeGuard<CustomError<T1>> = (unknown): unknown is CustomError<T1> => {
            return unknown !== null
                && unknown !== undefined
                && typeof unknown === "object"
                && "code" in unknown
                && typeof unknown.code === "string"
                && unknown.code === code
                && isBranded(unknown, "Error");
        }
        if (!guard(unknown)) return false;
        if (task) task(unknown);
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
        return stack
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
            .reduce((result, line) => {
                return result += line;
            });
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
        let symbol: string = "↟";
        let missing: string = "<<< MISSING >>>";
        let str0: string = locationO.unlockOr(missing);
        let str1: string = pathO.unlockOr(missing);
        let str2: string = lineO.unlockOr(missing).toString();
        let str3: string = columnO.unlockOr(missing).toString();
        return `${ symbol } ${ str0 } ${ str1 } ${ str2 } ${ str3 }`;
    }

    function _matchLine<T1>(line: string, onValid: Closure<[line: string], T1>, onInvalid: Closure<[line: string], T1>): T1 {
        if (line === "Error") return onInvalid(line);
        return onValid(line);
    }
})();