import { Logger } from "./logger";

import { type Closure } from "reliq";
import { Unsafe } from "reliq";
import { Result as Result0 } from "reliq";
import { Error as Error0 } from "reliq";
import { Err } from "reliq";
import { Ok } from "reliq";
import { wrap } from "reliq";
import { wrapAsync } from "reliq";

import { join } from "path";

import { Dirent, type Stats } from "fs";
import { existsSync } from "fs";
import { statSync } from "fs";
import { readdirSync } from "fs";

import { type FSWatcher } from "chokidar";
import { watch } from "chokidar";

export namespace Directory {
    export type Result<T1> = Result0<T1, Error>;

    export type Error = 
        | Unsafe
        | Error0<
            | "DIRECTORY.ERR_PATH_DOES_NOT_EXIST"
            | "DIRECTORY.ERR_PATH_IS_NOT_A_DIRECTORY"
        >;

    export type CloseListener = Closure<[], void>;

    export type ErrorListener = Closure<[e: Unsafe], void>;
    
    export type Listener = Closure<[path: string], void>;
    
    export type MapTask<T1> = Closure<[path: string], T1>;
}

export type Directory = {
    onFileEdit(listener: Directory.Listener): Directory.Result<Directory>;
    onFileCreation(listener: Directory.Listener): Directory.Result<Directory>;
    onFileDeletion(listener: Directory.Listener): Directory.Result<Directory>;
    onDirectoryCreation(listener: Directory.Listener): Directory.Result<Directory>;
    onDirectoryDeletion(listener: Directory.Listener): Directory.Result<Directory>;
    onError(listener: Directory.ErrorListener): Directory.Result<Directory>;
    onClose(listener: Directory.CloseListener): Directory.Result<Directory>;
    close(): Promise<Directory.Result<void>>;
    map<T1>(task: Directory.MapTask<T1>): Directory.Result<Array<T1>>;
    mapNested<T1>(task: Directory.MapTask<T1>): Directory.Result<Array<T1>>;
};

export function Directory(_path: string): Directory.Result<Directory> {
    let _this: Directory;
    let _socket: FSWatcher;

    /** @constructor */ {
        return _onlyDirectory(_path)
            .and(() => {
                _socket = watch(_path, {
                    persistent: true,
                    ignoreInitial: false,
                    depth: Infinity,
                    awaitWriteFinish: {
                        stabilityThreshold: 100,
                        pollInterval: 100
                    }
                });
                return Ok(_this = {
                    onFileEdit,
                    onFileCreation,
                    onFileDeletion,
                    onDirectoryCreation,
                    onDirectoryDeletion,
                    onError,
                    onClose,
                    close,
                    map,
                    mapNested
                }); 
            });
    }

    function onFileEdit(listener: Directory.Listener): Directory.Result<Directory> {
        return wrap(() => {
            _socket.on("change", listener);
            return _this;
        });
    }

    function onFileCreation(listener: Directory.Listener): Directory.Result<Directory> {
        return wrap(() => {
            _socket.on("add", listener);
            return _this;
        });
    }

    function onFileDeletion(listener: Directory.Listener): Directory.Result<Directory> {
        return wrap(() => {
            _socket.on("unlink", listener);
            return _this;
        });
    }

    function onDirectoryCreation(listener: Directory.Listener): Directory.Result<Directory> {
        return wrap(() => {
            _socket.on("addDir", listener);
            return _this;
        });
    }

    function onDirectoryDeletion(listener: Directory.Listener): Directory.Result<Directory> {
        return wrap(() => {
            _socket.on("unlinkDir", listener);
            return _this;
        });
    }

    function onError(listener: Directory.ErrorListener): Directory.Result<Directory> {
        return wrap(() => {
            _socket.on("error", e => {
                listener(Unsafe(e));
                return;
            });
            return _this;
        });
    }

    function onClose(listener: Directory.CloseListener): Directory.Result<Directory> {
        return wrap(() => {
            process.on("SIGINT", async () => {
                await _socket.close();
                listener();
                return;
            });
            return _this;
        });
    }

    async function close(): Promise<Directory.Result<void>> {
        return await wrapAsync(async () => {
            await _socket.close();
            return;
        });
    }

    function map<T1>(task: Directory.MapTask<T1>): Directory.Result<Array<T1>> {
        return _children().map(children => {
            return children.map(task);
        });
    }

    function mapNested<T1>(task: Directory.MapTask<T1>): Directory.Result<Array<T1>> {
        return _nestedChildren(_path).map(children => {
            return children.map(child => {
                return task(child);
            });
        });
    }

    function _children(): Directory.Result<Array<string>> {
        return wrap(() => {
            return readdirSync(_path);
        });
    }

    function _nestedChildren(path: string): Directory.Result<Array<string>> {
        let result: Array<string> = [];
        return wrap(() => readdirSync(_path, { withFileTypes: true }))
            .map(children => {
                children.forEach(child => {
                    let childPath: string = join(_path, child.name);
                    if (child.isDirectory()) _nestedChildren(childPath)
                        .map(children => {
                            result.push(...children);
                            return;
                        })
                        .mapErr(e => {
                            return Logger.logFailure(e);
                        });
                    return;
                });
                return;
            })
            .and(() => {
                return Ok(result);
            });
    }

    function _onlyDirectory(path: string): Directory.Result<void> {
        return wrap(() => {
            return existsSync(path);
        }).and(success => {
            if (!success) return Err(Error0("DIRECTORY.ERR_PATH_DOES_NOT_EXIST"));
            return Ok(undefined);
        }).and(() => {
            return wrap(() => {
                return statSync(path);
            });
        }).and(stat => {
            return wrap(() => {
                return stat.isDirectory();
            });
        }).and(success => {
            if (!success) return Err(Error0("DIRECTORY.ERR_PATH_DOES_NOT_EXIST"));
            return Ok(undefined);
        });
    }
}