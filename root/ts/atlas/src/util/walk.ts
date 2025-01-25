import type { Closure } from "reliq";
import type { Stats } from "fs";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Error } from "reliq";
import { wrap } from "reliq";
import { panic } from "reliq";
import { existsSync } from "fs";
import { readdirSync } from "fs";
import { statSync } from "fs";
import { join } from "path";

export type WalkTaskErrorCode =
    | "WALKER.ERR_PATH_DOES_NOT_EXIST"
    | "WALKER.ERR_NOT_A_DIRECTORY";

export type WalkTaskError = Error<WalkTaskErrorCode>;

export function walk<T1>(path: string, task: Closure<[path: string], T1>): Result<Array<T1>, WalkTaskError> {
    return _check(path)
        .and(() => {
            return _children(path);
        })
        .map(children => {
            return children.map(child => {
                return task(child);
            });
        });
}

function _children(path: string): Result<Array<string>, WalkTaskError>{
    return _check(path).and(() => {
        let result: Array<string> = [];
        readdirSync(path, { withFileTypes: true }).forEach(child => {
            let childPath: string = join(path, child.name);
            let isDirectory: boolean = child.isDirectory();
            if (isDirectory) return result.push(..._children(childPath).expect("[_children]: Invalid `childPath`."));
            return result.push(childPath);
        });
        return Ok(result);
    });
}

function _check(path: string): Result<void, WalkTaskError> {
    if (!existsSync(path)) return Err(Error("WALKER.ERR_PATH_DOES_NOT_EXIST", "[_check]: Path does not exist."));
    let successR: Result<void, WalkTaskError> = wrap(() => {
        let stats: Stats = statSync(path);
        if (!stats.isDirectory()) panic("[_check]: Path is not a directory.");
        return;
    }).mapErr(() => {
        return Error("WALKER.ERR_NOT_A_DIRECTORY", "[_check]: Path is not a directory.");
    });
    if (successR.err()) return successR;
    return Ok(undefined);
}