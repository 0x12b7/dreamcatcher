import type {Function} from "@seal";
import type {Outcome} from "@seal";

export async function capture<T>(action: Function<void, T>): Promise<Outcome<T>> {
    try {
        return [null, await action()];
    }
    catch (e) {
        return [e, null];
    }
}