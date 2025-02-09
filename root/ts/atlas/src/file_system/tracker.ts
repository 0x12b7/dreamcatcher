import { type Closure } from "reliq";
import { wrapAsync } from "reliq";
import { Unsafe } from "reliq";
import { Result as Result$0 } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Option } from "reliq";
import { wrap } from "reliq";
import { flag } from "reliq";

import { type Stats } from "fs";
import { type BigIntStats } from "fs";
import { type Dirent } from "fs";
import { existsSync } from "fs";
import { statSync } from "fs";
import { readdirSync } from "fs";

import { type FSWatcher } from "chokidar";
import { watch } from "chokidar";
import { join } from "path";

export type Tracker = {
    onFileEdit(listener: Tracker.Listener): Tracker.Result<Tracker>;
    onFileCreation(listener: Tracker.Listener): Tracker.Result<Tracker>;
    onFileDeletion(listener: Tracker.Listener): Tracker.Result<Tracker>;
    onDirCreation(listener: Tracker.Listener): Tracker.Result<Tracker>;
    onDirDeletion(listener: Tracker.Listener): Tracker.Result<Tracker>;
    onError(listener: Tracker.ErrorListener): Tracker.Result<Tracker>;
    onClose(listener: Tracker.CloseListener): Tracker.Result<Tracker>;
    close(): Promise<Tracker.Result<void>>;
    walk<T1>(task: Tracker.MapTask<T1>): Tracker.Result<Array<T1>>;
    walkNested<T1>(task: Tracker.MapTask<T1>): Tracker.Result<Array<T1>>;
};

export function Tracker(_dir: string): Tracker.Result<Tracker> {
    let _this: Tracker;
    let _socket: FSWatcher;

    /** @constructor */ {
        let existsR: Result$0<boolean, Unsafe> = wrap(() => {
            return existsSync(_dir);
        });
        if (existsR.err()) return existsR;
        let exists: boolean = existsR.unwrap();
        if (exists === false) return Err("DIR.ERR_NOT_FOUND");
        let statR: Result$0<
            | Stats
            | BigIntStats
            | undefined, Unsafe> 
            = wrap(() => {
                return statSync(_dir);
            });
        if (statR.err()) return statR;
        let statO: Option<Stats | BigIntStats> = flag(statR.unwrap());
        if (statO.none()) return Err("DIR.ERR_NOT_FOUND");
        let stat: Stats | BigIntStats = statO.unwrap();
        let isDirR: Result$0<boolean, Unsafe> = wrap(() => {
            return stat.isDirectory();
        });
        if (isDirR.err()) return isDirR;
        let isDir: boolean = isDirR.unwrap();
        if (isDir === false) return Err("DIR.ERR_NOT_DIR");
        let socketR: Result$0<FSWatcher, Unsafe> = wrap(() => {
            return watch(_dir, {
                persistent: true,
                ignoreInitial: false,
                depth: Infinity,
                awaitWriteFinish: {
                    stabilityThreshold: 100,
                    pollInterval: 100
                }
            });
        });
        if (socketR.err()) return socketR;
        _socket = socketR.unwrap();
        return Ok(_this = {
            onFileEdit,
            onFileCreation,
            onFileDeletion,
            onDirCreation,
            onDirDeletion,
            onError,
            onClose,
            close,
            walk,
            walkNested
        });
    }

    function onFileEdit(listener: Tracker.Listener): Tracker.Result<Tracker> {
        return wrap(() => {
            _socket.on("change", listener);
            return _this;
        });
    }

    function onFileCreation(listener: Tracker.Listener): Tracker.Result<Tracker> {
        return wrap(() => {
            _socket.on("add", listener);
            return _this;
        });
    }

    function onFileDeletion(listener: Tracker.Listener): Tracker.Result<Tracker> {
        return wrap(() => {
            _socket.on("unlink", listener);
            return _this;
        });
    }

    function onDirCreation(listener: Tracker.Listener): Tracker.Result<Tracker> {
        return wrap(() => {
            _socket.on("addDir", listener);
            return _this;
        });
    }

    function onDirDeletion(listener: Tracker.Listener): Tracker.Result<Tracker> {
        return wrap(() => {
            _socket.on("unlinkDir", listener);
            return _this;
        });
    }

    function onError(listener: Tracker.ErrorListener): Tracker.Result<Tracker> {
        return wrap(() => {
            _socket.on("error", e => {
                listener(Unsafe(e));
                return;
            });
            return _this;
        });
    }

    function onClose(listener: Tracker.CloseListener): Tracker.Result<Tracker> {
        let opR: Result$0<void, Unsafe> = wrap(() => {
            process.on("SIGINT", async () => {
                _socket.close();
                listener();
                return;
            });
            return;
        });
        if (opR.err()) return opR;
        return Ok(_this);
    }

    async function close(): Promise<Tracker.Result<void>> {
        return await wrapAsync(async () => {
            return await _socket.close();
        });
    }

    function walk<T1>(task: Tracker.MapTask<T1>): Tracker.Result<Array<T1>> {
        return wrap(() => {
            return readdirSync(_dir, { withFileTypes: true });
        }).map(children => children
            .filter(child => {
                let isDirR: Result$0<boolean, Unsafe> = wrap(() => {
                    return child.isDirectory();
                });
                if (isDirR.err()) return;
                let isDir: boolean = isDirR.unwrap();
                if (isDir === false) return true;
                return false; 
            })
            .map(child => {
                return task(join(_dir, child.name));
            })
        );
    }

    function walkNested<T1>(task: Tracker.MapTask<T1>): Tracker.Result<Array<T1>> {
        let childrenR: Tracker.Result<Array<string>> = _children(_dir);
        if (childrenR.err()) return childrenR;
        let children: Array<string> = childrenR.unwrap();
        let children$0: Array<T1> = children.map(task);
        return Ok(children$0);
    }

    function _children(dir: string): Tracker.Result<Array<string>> {
        let result: Array<string> = [];
        let childrenR: Result$0<Array<Dirent>, Unsafe> = wrap(() => {
            return readdirSync(dir, { withFileTypes: true });
        });
        if (childrenR.err()) return childrenR;
        let children: Array<Dirent> = childrenR.unwrap();
        children.forEach(child => {
            let path: string = join(dir, child.name);
            let isDirR: Result$0<boolean, Unsafe> = wrap(() => {
                return child.isDirectory();
            });
            if (isDirR.err()) return;
            let isDir: boolean = isDirR.unwrap();
            if (isDir === false) return result.push(path);
            let childrenR: Tracker.Result<Array<string>> = _children(path);
            if (childrenR.err()) return;
            let children: Array<string> = childrenR.unwrap();
            result.push(...children);
            return;
        });
        return Ok(result);
    }
}

export namespace Tracker {
    export type Result<T1> = Result$0<T1, Error>;

    export type Error =
        | Unsafe
        | ErrorCode;

    export type ErrorCode =
        | "DIR.ERR_NOT_FOUND"
        | "DIR.ERR_NOT_DIR";

    export type CloseListener = Closure<[], void>;

    export type ErrorListener = Closure<[e: Unsafe], void>;

    export type Listener = Closure<[path: string], void>;

    export type MapTask<T1> = Closure<[path: string], T1>;
}