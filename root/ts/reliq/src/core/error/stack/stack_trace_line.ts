import type { Option } from "@root";
import type { Serializable } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type StackTraceLine = 
    & Serializable 
    & {
    toString(line: bigint): string;
    location(): Option<string>;
    path(): Option<string>;
    line(): Option<bigint>;
    column(): Option<bigint>;
};

/**
 * ***Note***
 * Designed to parse stack trace line ie. "at someFunction (/path/to/file.js:10:15)".
 * 
 * ***Warning***
 * Use only for string representation or for display purposes, There are no guarantees
 * that the string representations or properties will be parsed correctly due to several
 * edge cases.
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
        let line: string = "";
        let missing: string = "???";
        let string0: string = _locationO.unwrapOr(missing);
        let string1: string = _pathO.unwrapOr(missing);
        let string2: string | bigint = _lineO.unwrapOr(missing);
        let string3: string | bigint = _columnO.unwrapOr(missing);
        if (args0) line = args0 + " |>";
        return `${ line } ${ string0 } ${ string1 } ${ string2 } ${ string3 }`;
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