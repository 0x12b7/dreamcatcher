export function panic(msg: string): never {
    throw Error(msg);
}