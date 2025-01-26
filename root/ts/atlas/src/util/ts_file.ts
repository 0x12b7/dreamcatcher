import { Result as Result0 } from "reliq";
import { Option } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Error as Error0 } from "reliq";
import { Unsafe } from "reliq";
import { wrap } from "reliq";
import { allO } from "reliq";
import { flag } from "reliq";
import { readFileSync } from "fs";

export namespace TsFile {
    export type Result<T1> = Result0<T1, Error>;

    export type Error =
        | Unsafe
        | Error0<
            | "TS_FILE.ERR_NOT_A_FILE"
            | "TS_FILE.ERR_DOES_NOT_EXIST"
            >;
}

export type TsFile = {
    raise(): TsFile.Result<bigint>;
};

export function TsFile(_path: string): TsFile.Result<TsFile> {
    /** @constructor */ {
        return Ok({ raise });
    }

    function addImport(path: string): string {
        
    }

    function raise(): TsFile.Result<bigint> {
        let contentR: Result0<string, Unsafe> = wrap(() => {
            return readFileSync(_path, { encoding: "utf8" });
        });
        if (contentR.err()) return contentR;
        let content: string = contentR.unlock();
        let contents: Array<string> = content
            .split(";")
            .at(0)
            ?.replaceAll('"', "")
            ?.split(" ") ?? [];
        if (contents.length !== 2) return Ok(0n);
        let element0O: Option<string> = flag(contents.at(0));
        let element1O: Option<string> = flag(contents.at(1));
        let result: bigint = allO(element0O, element1O)
            .toResult(undefined)
            .map(([element0, element1]) => {
                if (element0 !== "raise") return 0n;
                return BigInt(element1);
            })
            .unlockOr(0n);
        return Ok(result);
    }

    function _parse(): TsFile.Result<string> {
        let contentR: Result0<string, Unsafe> = wrap(() => {
            return readFileSync(_path, { encoding: "utf8" });
        });
        if (contentR.err()) return contentR;
        let content: string = contentR.unlock();
    }
}