import type {Maybe} from "@seal";

export type GetLocalStorageSlotAction = () => Maybe<string>;

export type SetLocalStorageSlotAction = (data: string) => void;

export type LocalStorageSlot = [
    get: GetLocalStorageSlotAction,
    set: SetLocalStorageSlotAction
];

export function useLocalStorage(key: string): LocalStorageSlot {
    return [get, set];
    
    function get(): Maybe<string> {
        return window.localStorage.getItem(key);
    }

    function set(data: string): void {
        return window.localStorage.setItem(key, data);
    }
}