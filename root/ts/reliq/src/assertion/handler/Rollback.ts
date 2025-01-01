import type { Maybe } from "@root";
import type { Function } from "@root";
import type { AsyncFunction } from "@root";
import { panic } from "@root";

export type RestorableCellHandler<T> = Function<void, T>;
export type RestorableCellAsyncHandler<T> = AsyncFunction<void, T>;
export type RestorableCellVerificationHandler<T> = Function<T, boolean>;

export type RestorableCellError = 
    | "RESTORABLE_CELL.ERR_UNABLE_TO_RESTORE_TO";

export type RestorableCell<T> = {
    get(): T;
    mut(handler: RestorableCellHandler<T>): T;
    mutAsync(handler: RestorableCellAsyncHandler<T>): T;
    rollback(): T;
    reset(): T;
    addVerificationStep(handler: RestorableCellVerificationHandler<T>): void;
    restore(): void;
};

export function RestorableCell<T>(_v: T): RestorableCell<T> {
    let _history: Array<T>;
    let _steps: Array<RestorableCellVerificationHandler<T>>;

    /** @constructor */ {
        _history = [];
        _steps = [];
        _history.push(_v);
    }

    function get(): T {
        return _v;
    }

    function mut(handler: RestorableCellHandler<T>): T {
        try {
            return handler();
        }
        catch (e) {
            return _restore();
        }
    }

    function restore(): T {

    }

    function reset() {

    }

    function addVerificationStep(handler: RestorableCellVerificationHandler<T>): void {
        _steps.push(handler);
        return;
    }




    function _restore(): T {
        let i: bigint = 

        let i: bigint = BigInt(_history.length - 1);
        while (i >= 0n) {
            let snapshot: T = _history[Number(i)];
            if (_isValidSnapshot(snapshot)) return snapshot;
            i--;
        }
        panic<RestorableCellError>("RESTORABLE_CELL.ERR_UNABLE_TO_RESTORE_TO");
    }

    function _isValidSnapshot(snapshot: T): boolean {
        let i: bigint = 0n;
        while (i < _steps.length) {
            let op: RestorableCellVerificationHandler<T> = _steps[Number(i)];
            if (!op(snapshot)) return false; 
            i++;
        }
        return true;
    }
}