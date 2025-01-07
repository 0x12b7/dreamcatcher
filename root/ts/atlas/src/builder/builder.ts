import { Compiler } from "solion";
import { Stats } from "fs";
import { Result } from "reliq";
import { Unsafe } from "reliq";
import { Ok } from "reliq";
import { readdirSync } from "fs";
import { statSync } from "fs";
import { join } from "path";
import { basename } from "path";
import { wrap } from "reliq";

export type Directory = {
    paths(): Result<Array<string>, Unsafe>;
    paths(type: string): Result<Array<string>, Unsafe>;
    paths(type: string, tag: string): Result<Array<string>, Unsafe>;
};

export function Directory(_path: string) {

    /** @constructor */ {
        
    }

    function paths(type?: string, tag?: string): Result<Array<string>, Unsafe> {
        let pathsR: Result<Array<string>, Unsafe> = wrap(() => {
            return readdirSync(_path);
        });
        if (pathsR.err()) return pathsR;
        let paths: Array<string> = pathsR.unwrapSafely();
        return Ok(paths);
    }
}


export type FileSystem = {
    paths(dir: string): Result<Array<string>, Unsafe>;
    paths(dir: string, type: string): Result<Array<string>, Unsafe>;
    paths(dir: string, type: string, tag: string): Result<Array<string>, Unsafe>;

    fetchFiles(dir: string): Result<Array<string>, Unsafe>;
    fetchFilesByType(dir: string, type: string): Result<Array<string>, Unsafe>;
    fetchFilesByTagType(dir: string, type: string, tag: string): Result<Array<string>, Unsafe>;
};

export function FileSystem(): FileSystem {

    /** @constructor */ {
        return { fetchFileType };
    }

    function paths(dir: string): Result<Array<string>, Unsafe> {
        let $pathsR: Result<Array<string>, Unsafe> = wrap(() => {
            return readdirSync(dir);
        });
        if ($pathsR.err()) return $pathsR;
        let $paths: Array<string> = $pathsR.unwrapSafely();
        return Ok($paths);
    }

    function pathsByType(dir: string, type: string): Result<Array<string>, Unsafe> {
        let $result: Array<string> = [];
        let $pathsR: Result<Array<string>, Unsafe> = paths(dir);
        if ($pathsR.err()) return $pathsR;
        let $paths: Array<string> = $pathsR.unwrapSafely();
        let i: bigint = 0n;
        while (i < $paths.length) {
            let path: string = $paths[Number(i)];
            let pathJoint: string = join(dir, path);
            let $statsR: Result<Stats, Unsafe> = wrap(() => {
                return statSync(pathJoint);
            });
            if ($statsR.err()) return $statsR;
            let $stats: Stats = $statsR.unwrapSafely();
            if ($stats.isDirectory()) {
                let $pathsRecursiveR: Result<Array<string>, Unsafe> = pathsByType(path, type);
                if ($pathsRecursiveR.err()) return $pathsRecursiveR;
                let $pathsRecursive: Array<string> = $pathsRecursiveR.unwrapSafely();
                $result = [... $result, ... $pathsRecursive];
            }
            if ($stats.isFile() && path.endsWith(type)) $result.push(path);
            i++;
        }
        return Ok($result);
    }



    

    function fetchFileType(dir: string, type: string, tag?: string): Result<Array<string>, Unsafe> {
        if (tag) return fetchFileTagType(dir, type, tag);
        let result: Array<string> = [];
        let filesR: Result<Array<string>, Unsafe> = wrap(() => {
            return readdirSync(dir);
        });
        if (filesR.err()) return filesR;
        let files: Array<string> = filesR.unwrapSafely();
        let i: bigint = 0n;
        while (i < files.length) {
            let file: string = files[Number(i)];
            let path: string = join(dir, file);
            let statsR: Result<Stats, Unsafe> = wrap(() => {
                return statSync(path);
            });
            if (statsR.err()) return statsR;
            let stats: Stats = statsR.unwrapSafely();
            if (stats.isDirectory()) {
                let filesR: Result<Array<string>, Unsafe> = fetchFileType(path, type);
                if (filesR.err()) return filesR;
                let files: Array<string> = filesR.unwrapSafely();
                result = [... result, ... files];
            }
            if (stats.isFile() && file.endsWith(type)) result.push(path);
            i++;
        }
        return Ok(result);
    }
    
    function fetchFileTagType(dir: string, type: string, tag: string): Result<Array<string>, Unsafe> {
        let result: Array<string> = [];
        let pathsR: Result<Array<string>, Unsafe> = fetchFileType(dir, type);
        if (pathsR.err()) return pathsR;
        let paths: Array<string> = pathsR.unwrapSafely();
        let i: bigint = 0n;
        while (i < paths.length) {
            let path: string = paths[Number(i)];
            let base: string = basename(path);
            let shards: Array<string> = base.split(".");
            let secondsToLastShard: string = shards[shards.length - 2];
            if (secondsToLastShard === tag) result.push(path);
            i++;
        }
        return Ok(result);
    }
}


FileSystem()
    .fetchFilesByTagType("", "ts", "test")
    .unwrap();