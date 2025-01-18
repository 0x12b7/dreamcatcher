import {
    type Result,
    type Option,
    ResultHandler,
    DomError
} from "@root";

export function clone<T1>(data: T1): Result<T1, DomError> {
    return ResultHandler.wrap(() => {
        return structuredClone(data);
    }).mapErr(unsafe => unsafe
        .parse((instance): instance is DOMException => {
            return instance !== null
                && instance !== undefined
                && typeof instance === "object"
                && "name" in instance
                && "code" in instance
                && "message" in instance
                && typeof instance.name === "string"
                && typeof instance.code === "number"
                && typeof instance.message === "string";
        })
        .toResult(undefined)
        .map(exception => DomError(exception))
        .restore(() => DomError()));
}