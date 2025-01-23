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
        _locationO = None;
        _pathO = None;
        _lineO = None;
        _columnO = None;
        let elements: Array<string> = _line.split(" ");
        let firstElement: string | undefined = elements.shift();
        if (firstElement && firstElement.trim().length !== 0) {
            let secondElement: string | undefined = elements.shift();
            let thirdElement: string | undefined = elements.shift();
            if (secondElement && secondElement.trim().length !== 0) _locationO = Some(secondElement);
            if (thirdElement && thirdElement.trim().length !== 0) {
                let thirdElements: Array<string> = thirdElement
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .split(":");
                let firstThirdElement: string | undefined = thirdElements.shift();
                let lastThirdElement: string | undefined = thirdElements.at(thirdElements.length - 1);
                let secondToLastThirdElement: string | undefined = thirdElements.at(thirdElements.length - 2);
                if (firstThirdElement && firstThirdElement.trim().length !== 0) _pathO = Some(firstThirdElement);
                if (lastThirdElement && lastThirdElement.trim().length !== 0) _columnO = Some(BigInt(lastThirdElement));
                if (secondToLastThirdElement && secondToLastThirdElement.trim().length !== 0) _lineO = Some(BigInt(secondToLastThirdElement));
            }
        }
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
}