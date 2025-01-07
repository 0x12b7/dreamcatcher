import { Stats } from "fs";
import { Result } from "reliq";
import { Unsafe } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { wrap } from "reliq";
import { readdirSync } from "fs";
import { statSync } from "fs";
import { join } from "path";

export type SolFileSystemDriverError = 
    | "SOL_FILE_SYSTEM_DRIVER.ERR_UNKNOWN"
    | "SOL_FILE_SYSTEM_DRIVER.ERR_INVALID_FOLDER"
    | "SOL_FILE_SYSTEM_DRIVER.ERR_NO_SUCH_FILE_OR_DIRECTORY"
    | "SOL_FILE_SYSTEM_DRIVER.ERR_PERMISSION_DENIED"
    | "SOL_FILE_SYSTEM_DRIVER.ERR_IS_DIRECTORY"
    | "SOL_FILE_SYSTEM"

export type SolFileSystemDriver = {
    files(): Result<Array<string>, Unsafe>;
};

export function SolFileSystemDriver(_folder: string): Result<SolFileSystemDriver, SolFileSystemDriverError> {

    /** @constructor */ {
        let statsR: Result<Stats, Unsafe> = wrap(() => statSync(_folder));
        if (statsR.err()) {
            let unsafe: Unsafe = statsR.val();
            let e: unknown = unsafe.unwrap();

        }
        let stats: Stats = statsR.unwrapSafely();
        if (stats.isDirectory() === false) return Err("SOL_FILE_SYSTEM_DRIVER.ERR_INVALID_FOLDER");
        return Ok({ files });
    }

    function files(): Result<Array<string>, Unsafe> {
        let extension: string = "sol";
        let pathsR: Result<Array<string>, Unsafe> = wrap(() => readdirSync(_folder));
        if (pathsR.err()) return pathsR;
        let paths: Array<string> = pathsR.unwrapSafely();
        let result: Array<string> = [];
        let i: bigint = 0n;
        while (i < paths.length) {
            let path: string = paths[Number(i)];
            let jointPath: string = join(_folder, path);
            let statsR: Result<Stats, Unsafe> = wrap(() => statSync(jointPath));
            if (statsR.err()) return statsR;
            let stats: Stats = statsR.unwrapSafely();
            if (stats.isDirectory()) {
                let recursivePathsR: Result<Array<string>, Unsafe> = files();
                if (recursivePathsR.err()) return recursivePathsR;
                let recursivePaths: Array<string> = recursivePathsR.unwrapSafely();
                result = result.concat(recursivePaths);
            }
            else if (stats.isFile() && path.endsWith(extension)) result.push(path);
            i++;
        }
        return Ok(result);
    }

    function _map(e: unknown): SolFileSystemDriverError {
        if (!(
            e !== null
            && e !== undefined
            && typeof e === "object"
            && "code" in e
            && typeof e.code === "string"
        )) return "SOL_FILE_SYSTEM_DRIVER.ERR_UNKNOWN";
        let errcode: SolFileSystemDriverError =
            e.code === "ENOENT" ? 
    }
}