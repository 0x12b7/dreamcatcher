import type {Function} from "->std";
import type {Outcome} from "->std";

export async function capture<T>(action: Function<void, T>): Promise<Outcome<T>> {
    try {
        return [null, await action()];
    }
    catch (e) {
        return [e, null];
    }
}