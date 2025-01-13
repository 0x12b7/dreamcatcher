import type { Result } from "@root";
import type { Option } from "@root";
import { ResultHandler } from "@root";
import { DomError } from "@root";

export function clone<T1>(data: T1): Result<T1, DomError> {
    return ResultHandler.wrap(() => {
        return structuredClone(data);
    }).mapErr(unsafe => {
        let eO: Option<DOMException> = unsafe.parse((instance): instance is DOMException => {
            return instance !== null
                && instance !== undefined
                && typeof instance === "object"
                && "name" in instance
                && "code" in instance
                && "message" in instance
                && typeof instance.name === "string"
                && typeof instance.code === "number"
                && typeof instance.message === "string";
        });
        if (eO.none()) return DomError();
        let e0: DOMException = eO.unwrapSafely();
        let e1: DomError = DomError(e0);
        return e1;
    });
}