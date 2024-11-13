export function assert<T extends string = "CRIT_ERR">(condition: boolean): asserts condition is true;
export function assert<T extends string>(condition: boolean, errcode: T): asserts condition is true;
export function assert<T extends string = "CRIT_ERR">(condition: boolean, errcode?: T): asserts condition is true {
    if (condition) return;
    if (errcode) throw Error(errcode);
    throw Error("CRIT_ERR");
}