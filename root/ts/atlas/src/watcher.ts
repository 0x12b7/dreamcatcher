import type { Closure } from "reliq";
import type { FSWatcher } from "chokidar";
import { Result } from "reliq";
import { Unsafe } from "reliq";
import { wrap } from "reliq";
import { wrapAsync } from "reliq";
import { watch } from "chokidar";

export type WatcherTask = Closure<[path: string], void>;

export type WatcherHandleErrorTask = Closure<[e: Unsafe], void>;

export type WatcherCloseTask = Closure<[], void>;

export type Watcher = {
    onFileEdit(task: WatcherTask): Result<Watcher, Unsafe>;
    onFileCreation(task: WatcherTask): Result<Watcher, Unsafe>;
    onFileDeletion(task: WatcherTask): Result<Watcher, Unsafe>;
    onDirectoryCreation(task: WatcherTask): Result<Watcher, Unsafe>;
    onDirectoryDeletion(task: WatcherTask): Result<Watcher, Unsafe>;
    onError(task: WatcherHandleErrorTask): Result<Watcher, Unsafe>;
    onClose(task: WatcherCloseTask): Result<Watcher, Unsafe>;
    close(): Promise<Result<void, Unsafe>>;
};

export function Watcher(_path: string): Result<Watcher, Unsafe> {
    let _this: Watcher;
    let _socket: FSWatcher;

    /** @constructor */ {
        return wrap(() => {
            _socket = watch(_path, {
                persistent: true,
                ignoreInitial: false,
                depth: Infinity,
                awaitWriteFinish: {
                    stabilityThreshold: 100,
                    pollInterval: 100
                }
            });
            return;
        }).map(() => {
            return _this = {
                onFileEdit,
                onFileCreation,
                onFileDeletion,
                onDirectoryCreation,
                onDirectoryDeletion,
                onError,
                onClose,
                close
            };
        });
    }

    function onFileEdit(task: WatcherTask): Result<Watcher, Unsafe> {
        return wrap(() => {
            _socket.on("change", task);
            return _this;
        });
    }

    function onFileCreation(task: WatcherTask): Result<Watcher, Unsafe> {
        return wrap(() => {
            _socket.on("add", task);
            return _this;
        });
    }

    function onFileDeletion(task: WatcherTask): Result<Watcher, Unsafe> {
        return wrap(() => {
            _socket.on("unlink", task);
            return _this;
        });
    }

    function onDirectoryCreation(task: WatcherTask): Result<Watcher, Unsafe> {
        return wrap(() => {
            _socket.on("addDir", task);
            return _this;
        });
    }

    function onDirectoryDeletion(task: WatcherTask): Result<Watcher, Unsafe> {
        return wrap(() => {
            _socket.on("unlinkDir", task);
            return _this;
        });
    }

    function onError(task: WatcherHandleErrorTask): Result<Watcher, Unsafe> {
        return wrap(() => {
            _socket.on("error", e => {
                task(Unsafe(e));
                return;
            });
            return _this;
        });
    }

    function onClose(task: WatcherCloseTask): Result<Watcher, Unsafe> {
        return wrap(() => {
            process.on("SIGINT", async () => {
                await _socket.close();
                task();
                return;
            });
            return _this;
        });
    }

    async function close(): Promise<Result<void, Unsafe>> {
        return await wrapAsync(async () => {
            await _socket.close();
            return;
        });
    }
}