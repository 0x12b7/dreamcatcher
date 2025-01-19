import {
    type Serializable
} from "@root";


import { StackTraceLine } from "@root";


export type StackTrace = 
    & Serializable
    & {
    lines(): Array<StackTraceLine>;
};


export function StackTrace(): StackTrace;
export function StackTrace(_stack: string): StackTrace;
export function StackTrace(
    _args0?: string
): StackTrace {
    
    let _lines: Array<string>;

    /** @constructor */ {
        _lines = _stack
            .split("\n")
            .map(line => {
                return line.trim();
            })
            .filter(line => {
                return line.length > 0;
            });
        
        _lines.forEach(line => console.log(line));
    }

    
}

Stack(`Error: Something went wrong
    at someFunction (/path/to/file.js:10:15)
    at anotherFunction (/path/to/otherfile.js:20:25)
    at main (/path/to/mainfile.js:30:35)`);