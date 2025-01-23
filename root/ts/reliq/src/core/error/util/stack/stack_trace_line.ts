import type { Option } from "@root";
import type { Serializable } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type StackTraceLine = 
    & Serializable 
    & {

    /**
     * ***Brief***
     * `toString` returns a string representation of the stack trace line, either as the formatted version or with a specific line number.
     */
    toString(line: bigint): string;

    /**
     * ***Brief***
     * The parsed `location` (such as the function name) from the stack trace line.
     * 
     */
    location(): Option<string>;

    /**
     * ***Brief***
     * The parsed file `path` from the stack trace.
     */
    path(): Option<string>;

    /**
     * ***Brief***
     * The `line` number where the error occurred.
     */
    line(): Option<bigint>;

    /**
     * ***Brief***
     * The `column` number where the error occurred.
     */
    column(): Option<bigint>;
};

/**
 * ***Brief***
 * Parses a stack trace line in the form `"at functionName (/path/to/file.js:line:column)"`.
 * 
 * ***Warning***
 * Intended for display only—parsing. 
 * 
 * ***Warning***
 * May parse incorrectly on edge cases.
*/
export function StackTraceLine(_line: `at ${ string } (${ string })`): StackTraceLine {
    let _locationO: Option<string>;
    let _pathO: Option<string>;
    let _lineO: Option<bigint>;
    let _columnO: Option<bigint>;

    /** @constructor */ {
        [_locationO, _pathO, _lineO, _columnO] = _parse(_line);
        return { toString, location, path, line, column };
    }

    function toString(): string;
    function toString(line: bigint): string;
    function toString(
        args0?: bigint
    ): string {
        let line_: string = "";
        let missing: string = "???";
        let string0: string = location().unlockOr(missing);
        let string1: string = path().unlockOr(missing);
        let string2: string | bigint = line().unlockOr(missing);
        let string3: string | bigint = column().unlockOr(missing);
        if (args0) line_ = args0 + " |>";
        return `${ line_ } ${ string0 } ${ string1 } ${ string2 } ${ string3 }`;
    }

    function location(): Option<string> {
        return _locationO;
    }

    function path(): Option<string> {
        return _pathO;
    }

    function line(): Option<bigint> {
        return _lineO;
    }

    function column(): Option<bigint> {
        return _columnO;
    }

    function _parse(line: string): [location: Option<string>, path: Option<string>, line: Option<bigint>, column: Option<bigint>] {
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
}