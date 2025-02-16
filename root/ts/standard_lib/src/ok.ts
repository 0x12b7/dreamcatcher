type Result<T1, T2> = Ok<T1> | Err<T2>;

type Ok<T1> = {
    is_ok(): this is Ok<T1>;
    is_err(): this is Err<T1>;
    expect(): T1;
    expect(__: unknown): T1;
    expect(__?: unknown): T1;
    expect_err(): never;
    expect_err(message: string): never;
    expect_err(message?: string): never;
    unwrap(): T1;
    unwrap_or(__: unknown): T1;
    unwrap_safely(): T1;
    recover(__: unknown): Ok<T1>;
    degrade<T2>(task: Function): Err<T2>;
};

type Err<T1> = {
    is_ok(): this is Ok<T1>;
    is_err(): this is Err<T1>;
    expect(): never;
    expect_err(): T1;
    unwrap(): never;
    unwrap_or<T2>(fallback: T2): T2;
    recover(): Ok<T1>;
    degrade(__: unknown): Err<T1>;
}

export {
    type Result,
    type Ok,
    type Err
};


let counter: Result<string, string>;
if (counter!.is_ok()) {
    let counter_$0: string = counter.unwrap_safely();
    let first_char: string = counter_$0[0];
    if (first_char === "*") {
        console.log("");
    }
}