import { Directory } from "@root";

import { Result as ReliqResult } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Error as ReliqError } from "reliq";
import { wrap } from "reliq";

export namespace Module {
    export type Result<T1> = ReliqResult<T1, Error>;

    export type Error =
        | Directory.Error
        | ReliqError<ErrorCode>;
    
    export type ErrorCode =
        | "MODULE.ERR_MODULE_FILE_NOT_DETECTED";
}

export type Module = 
    & Directory 
    & {
    
};

export function Module(_path: string): Module.Result<Module> {
    let _this: Module;
    
    /** @constructor */ {
        let parentR: Directory.Result<Directory> = Directory(_path);
        if (parentR.err()) return parentR;
        let parent: Directory = parentR.unlock();
        let success: boolean = false;
        parent.map(path => {
            if (path.endsWith("mod.internal.ts")) success = true;
            return;
        });
        if (!success) return Err(ReliqError("MODULE.ERR_MODULE_FILE_NOT_DETECTED"));
        return Ok(_this = { ...parent });
    }

    function collate() {

    }
}