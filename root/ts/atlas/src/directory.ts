import { None, Result, Some } from "reliq";
import { Option } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Unsafe } from "reliq";
import { DirectoryPathsFilterOption } from "./directory_path_filter_option";
import { Stats } from "fs";
import { wrap } from "reliq";
import { readdirSync } from "fs";
import { statSync } from "fs";
import { join } from "path";
import { basename } from "path";

export type Directory = {
    paths(option: Option<DirectoryPathsFilterOption>): Result<Array<string>, Unsafe>;
};

export function Directory(_path: string): Result<Directory, Unsafe> {

    /** @constructor */ {
        let statsR: Result<Stats, Unsafe> = wrap(() => {
            return statSync(_path);
        });
        if (statsR.err()) return statsR;
        let stats: Stats = statsR.unwrapSafely();
        if (!stats.isDirectory()) return Err(Unsafe("DIRECTORY.ERR_INVALID_PATH"));
        return Ok({ paths });
    }

    function paths(optionO: Option<DirectoryPathsFilterOption>): Result<Array<string>, Unsafe> {
        let pathsR: Result<Array<string>, Unsafe> = wrap(() => {
            return readdirSync(_path);
        });
        if (pathsR.err()) return pathsR;
        let paths_: Array<string> = pathsR.unwrapSafely();
        if (optionO.none()) return Ok(paths_);
        let option: DirectoryPathsFilterOption = optionO.unwrapSafely();
        let extensionO: Option<string> = option.extension;
        let tagO: Option<string> = option.tag;
        let result0: Array<string> = [];
        if (extensionO.some()) {
            let extension: string = extensionO.unwrapSafely();
            let i: bigint = 0n;
            while (i < paths_.length) {
                let path: string = paths_[Number(i)];
                let jointPath: string = join(_path, path);
                let statsR: Result<Stats, Unsafe> = wrap(() => {
                    return statSync(jointPath);
                });
                if (statsR.err()) return statsR;
                let stats: Stats = statsR.unwrapSafely();
                if (stats.isDirectory()) {
                    let recursivePathsR: Result<Array<string>, Unsafe> = paths(None);
                    if (recursivePathsR.err()) return recursivePathsR;
                    let recursivePaths: Array<string> = recursivePathsR.unwrapSafely();
                    result0 = [... result0, ... recursivePaths];
                }
                else if (stats.isFile() && path.endsWith(extension)) result0.push(path);
                i++;
            }
        }
        let result1: Array<string> = []
        if (tagO.some()) {
            let tag: string = tagO.unwrapSafely();
            let i: bigint = 0n;
            while (i < result0.length) {
                let path: string = result0[Number(i)];
                let base: string = basename(path);
                let fragments: Array<string> = base.split(".");
                let secondToLastFragment: string | undefined = fragments[fragments.length - 2];
                if (secondToLastFragment && secondToLastFragment === tag) result1.push(path);
                i++;
            }
        }
        return Ok(result1);
    }
}



Directory(join(__dirname, "../"))
    .andThen(dir => dir.paths(Some(DirectoryPathsFilterOption({
        extension: Some("ts"),
        tag: None
    }))))
    .map(paths => paths.forEach(path => console.log(path)))
    .mapErr(e => e.unwrap())
    .unwrap();