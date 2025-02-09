import { Unsafe } from "reliq";
import { Option } from "reliq";
import { Result as Result$0 } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { wrap } from "reliq";
import { flag } from "reliq";
import { allO } from "reliq";

import { type Stats } from "fs";
import { existsSync } from "fs";
import { statSync } from "fs";
import { readFileSync } from "fs";
import { readdirSync } from "fs";
import { writeFileSync } from "fs";

import { join } from "path";
import { relative } from "path";
import { basename } from "path";

export type TsModule = {
    link(): TsModule.Result<TsModule>;
};

export function TsModule(_dir: string): TsModule.Result<TsModule> {
    let _this: TsModule;

    /***/ {
        let existsR: Result$0<boolean, Unsafe> = wrap(() => {
            return existsSync(_dir);
        });
        if (existsR.err()) return existsR;
        let exists: boolean = existsR.unwrap();
        if (exists === false) return Err("TS_MODULE.ERR_MISSING_DIRECTORY");
        let statR: Result$0<Stats, Unsafe> = wrap(() => {
            return statSync(_dir);
        });
        if (statR.err()) return statR;
        let stat: Stats = statR.unwrap();
        let isDirR: Result$0<boolean, Unsafe> = wrap(() => {
            return stat.isDirectory();
        })
        if (isDirR.err()) return isDirR;
        let isDir: boolean = isDirR.unwrap();
        if (isDir === false) return Err("TS_MODULE.ERR_IS_NOT_DIRECTORY");
        
        return Ok(_this = { link });
    }

    function link(): TsModule.Result<TsModule> {
        let sorted: Array<string> = [];
        let set: Array<Array<string>> = [];
        let out: string = "";
        _walk(_dir).forEach(file => {
            let raise: bigint = _raise(file);
            set[Number(raise)] ??= [];
            set[Number(raise)].push(file);
            return;
        });
        set.forEach(files => {
            files.forEach(file => {
                sorted.push(file);
                return;
            });
            return;
        });
        sorted
            .reverse()
            .forEach(file => {
                let base: string = basename(file);
                let els: Array<string> = base.split(".");
                if (els.length === 0) return;
                let el0O: Option<string> = flag(els.at(0));
                let el1O: Option<string> = flag(els.at(1));
                let el2O: Option<string> = flag(els.at(2));
                let skip: boolean = false;
                el0O.map(el => {
                    if (el === "mod") skip = true;
                    return;
                })
                el1O.map(el => {
                    if (el === "test") skip = true;
                    return;
                });
                el2O.map(el => {
                    if (el !== "ts") skip = true;
                    return;
                });
                if (skip) return;
                let path: string = relative(_dir, file).replace(/\\/g, "/");
                out += _import("./" + path) + "\n";
                return;
            });
        let opR: Result$0<void, Unsafe> = wrap(() => {
            return writeFileSync(join(_dir, "mod.internal.ts"), out, { flush: true });
        });
        if (opR.err()) return opR;
        return Ok(_this);
    }

    function _walk(dir: string): Array<string> {
        let result: Array<string> = [];
        let resultR: Result$0<void, Unsafe> = wrap(() => {
            return readdirSync(dir, { withFileTypes: true }).forEach(item => {
                let path: string = join(dir, item.name);
                if (item.isDirectory()) return result.push(..._walk(path));
                if (item.isFile() && path.endsWith(".ts")) return result.push(path);
                return;
            });
        });
        if (resultR.err()) return [];
        return result;
    }

    function _raise(path: string): bigint {
        let linesR: Result$0<Option<Array<string>>, Unsafe> = wrap(() => {
            return flag(
                readFileSync(path, { encoding: "utf8" })
                    .split(";")
                    .at(0)
                    ?.replaceAll('"', "")
                    ?.split(" ")
            );
        });
        if (linesR.err()) return 0n;
        let linesO: Option<Array<string>> = linesR.unwrap();
        let lines: Array<string> = linesO.unwrapOr([]);
        if (lines.length !== 2) return 0n;
        let element0O: Option<string> = flag(lines.at(0));
        let element1O: Option<string> = flag(lines.at(1));
        let elementsO: Option<[string, string]> = allO(element0O, element1O);
        return elementsO
            .map(([element0, element1]) => {
                if (element0 !== "raise") return 0n;
                /// Warning
                return BigInt(element1);
            })
            .unwrapOr(0n);
    }

    function _import(path: string): string {
        return `export * from "${ path }";`;
    }
}

export namespace TsModule {
    export type Result<T1> = Result$0<T1, Error>;

    export type Error =
        | Unsafe
        | ErrorCode;

    export type ErrorCode =
        | "TS_MODULE.ERR_IS_NOT_DIRECTORY"
        | "TS_MODULE.ERR_MISSING_DIRECTORY";
}