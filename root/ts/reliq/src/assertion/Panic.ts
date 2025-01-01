export function panic<T extends string>(msg: T): never {
    throw Error(msg);
}