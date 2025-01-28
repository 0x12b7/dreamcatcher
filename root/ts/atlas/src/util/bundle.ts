import { allR, Result as Result0 } from "reliq";
import { Error as Error0 } from "reliq";
import { Ok } from "reliq";
import { Unsafe } from "reliq";
import { TsFile } from "./ts_file";
import { wrapAsync } from "reliq";
import { write } from "bun";

export namespace Bundle {
    export type Result<T1> = Result0<T1, Error>;

    export type Error =
        | Unsafe
        | Error0<
            | ""
        >;
}

export type Bundle = {
    insertExport(file: TsFile): Bundle;
    removeExport(file: TsFile): Bundle;
    build(path: string): Promise<Bundle.Result<Bundle>>;
};

export function Bundle() {
    let _this: Bundle;
    let _exports: Array<TsFile>;
    
    /***/ {
        _exports = [];
        return _this = {
            insertExport,
            removeExport,
            build
        }
    }

    function insertExport(file: TsFile): Bundle {
        
        
        return file
            .raise()
            .and(raise => {

            });
        _out.push();
        return _this;
    }

    function removeExport(file: TsFile): Bundle {
        

        let k: number = _out.indexOf(path);
        if (k === -1) return _this;
        _out.splice(k, 1)!;
        return _this;
    }

    function sort(): void {
        _exports.sort((file0, file1) => {
            return allR([file0.raise(), file1.raise()] as const)
                .map(([raise0, raise1]) => {
                    return Number(raise0 - raise1);
                })
                .recover(() => {
                    return 0;
                })
                .unlock();
        });
        return;
    }

    async function build(path: string): Promise<Bundle.Result<Bundle>> {
        let r: Result0<void, Unsafe> = await wrapAsync(async () => {
            let content = _exports
                .map(path => _export(path))
                .join("\n");
            await write(path, content);
        });
        if (r.err()) return r;
        return Ok(_this);
    }

    function _export(path: string): string {
        return `export * from "${ path }";`;
    }
}

(await Bundle()
    .insertExport("./cheese")
    .insertExport("./joe")
    .removeExport("./cheese")
    .build(__dirname + "/mod.ts"))
    .mapErr(e => {
        if ("code" in e) {

        }
        else {
            console.log(e.unwrap());
        }
    })
    