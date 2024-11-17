import type {Maybe} from "./Maybe";
import {default as Chalk} from "chalk";

export function assert<T extends string = "CRIT_ERR">(condition: boolean): asserts condition is true;
export function assert<T extends string>(condition: boolean, errcode: T): asserts condition is true;
export function assert<T extends string = "CRIT_ERR">(condition: boolean, errcode?: T): asserts condition is true {
    if (condition) return;
    let e: Error = Error(errcode ?? "CRIT_ERR");
    let stack: Maybe<string> = e.stack;
    Error.captureStackTrace(e, assert);

    
    let message: string = `${Chalk.red(`${_scope(stack)}:` + " ⚠︎  " + (errcode ?? "CRIT_ERR"))}
    
${Chalk.bold(`Stack Trade: ${stack}`)}
    `;

    throw (e.message = message);
}

function _scope(stack?: string): string {
    let lines: Maybe<Array<string>> = stack?.split("\n");
    let lastLine: Maybe<string> = lines?.at(2);
    let scope: Maybe<RegExpMatchArray> = lastLine?.match(/at\s([^\s]+)\s/);
    return (scope ? scope.at(1) : "UNKNOWN_SCOPE") ?? "UNKNOWN_SCOPE";
}