import {
    type ResultArray,
    type Serializable,
    type StackTraceLineError
} from "@root";
import {
    StackTraceLine
} from "@root";
import {
    localStackTrace
} from "@root";

export type StackTrace = 
    & Serializable
    & {
    lines(): Array<StackTraceLine>;
};

export function StackTrace(_location: Function): StackTrace;
export function StackTrace(_lines: Array<StackTraceLine>): StackTrace;
export function StackTrace(_stack: string): StackTrace;
export function StackTrace(
    _args0: 
        | Array<StackTraceLine> 
        | Function 
        | string
): StackTrace {
    let _lines: ResultArray<StackTraceLine, StackTraceLineError>;

    /** @constructor */ {
        if (typeof _args0 === "string") _lines = _parse(_args0);
        if (typeof _args0 === "function") _lines = _parse(localStackTrace(_args0).unlockOr(""));
        if (Array.isArray(_args0)) _lines = _args0;
        return { toString, lines };
    }

    /**
     * **Example**
     * ```ts
     *  `
     *  0 |> someFunction /path/to/file.js 10 15
     *  1 |> <<< STACK_TRACE_LINE.ERR_LOCATION_UNAVAILABLE >>>
     *  2 |> anotherFunction @ /path/to/otherfile.js 20 25
     *  3 |> main @ /path/to/mainfile.js 30 35
     *  `
     * ```
     */
    function toString(): string {
        let result: string = "";
        lines()
            .map(lineR => {
                return lineR
                    .map(line => {
                        return line.toString();
                    })
                    .mapErr(lineE => {
                        return `<<< ${ lineE.code } >>>`;
                    })
                    .recover(line => {
                        return line;
                    })
                    .unlock();
            })
            .forEach(line => {
                result += line + "\n";
            });
        return result;
    }

    function lines(): ResultArray<StackTraceLine, StackTraceLineError> {
        return _lines;
    }

    function _parse(stack: string): ResultArray<StackTraceLine, StackTraceLineError> {
        return stack
            .split("\n")
            .map(line => {
                return line.trim();
            })
            .filter(line => {
                return line.length > 0;
            })
            .map(line => {
                return StackTraceLine(line);
            });
    }
}

Stack(`Error: Something went wrong
    at someFunction (/path/to/file.js:10:15)
    <<< STACK_TRACE_LINE.ERR_LOCATION_UNAVAILABLEE >>>
    at anotherFunction (/path/to/otherfile.js:20:25)
    at main (/path/to/mainfile.js:30:35)`);