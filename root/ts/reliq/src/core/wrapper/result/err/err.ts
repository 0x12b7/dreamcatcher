import {
    type Branded,
    type RecoveryWrapper,
    type Serializable,
    type Displayable,
    type Function,
    Ok,
    type Option,
    StringHandler,
    None,
    isOption
} from "@root";

export type Err<T1> = 
    & Branded<"Err">
    & RecoveryWrapper<T1>
    & Serializable
    & Displayable
    & {
    ok(): this is Ok<unknown>;
    err(): this is Err<T1>;
    inspect(): T1;
    stack(): string;
    expect(message: string): never;
    expectErr(__: unknown): T1;
    and(__: unknown): Err<T1>;
    map(__: unknown): Err<T1>;
    mapErr<T2>(operation: Function<T1, T2>): Err<T2>;
    restore<T2>(operation: Function<T1, T2>): Ok<T2>;
    toOption(): Option<never>;
};

export function Err<T1>(_value: T1): Err<T1> {
    let _this: Err<T1>;
    let _stack: string;
    
    /** @constructor */ {
        let e: Error = Error();
        Error.captureStackTrace(e, Err);
        _stack = e.stack ?? "";
        return _this = {
            type,
            ok,
            err,
            inspect,
            stack,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            and,
            map,
            mapErr,
            restore,
            toOption,
            toString,
            display
        };
    }

    function type(): "Err" {
        return "Err";
    }

    function ok(): this is Ok<unknown> {
        return false;
    }

    function err(): this is Err<T1> {
        return true;
    }

    function inspect(): T1 {
        return _value;
    }

    function stack(): string {
        return _stack;
    }

    function expect(message: string): never {
        throw message + "\n" + stack();
    }

    function expectErr(__: unknown): T1 {
        return inspect();
    }

    function unwrap(): never {
        let value0: T1 = inspect();
        if (
            value0 !== null
            && value0 !== undefined
            && typeof value0 === "object"
            && "code" in value0
            && "message" in value0
            && typeof value0.code === "string"
            && isOption(value0.message)
        ) {
            value0.message.map(message => {
                throw value0.code + ":" + " " + message + "\n" + stack();
            });
            throw value0.code + "\n" + stack();
        }
        throw StringHandler().toString(inspect()) + "\n" + stack();
    }

    function unwrapOr<T2>(alternative: T2): T2 {
        return alternative;
    }

    function and(__: unknown): Err<T1> {
        return _this;
    }

    function map(__: unknown): Err<T1> {
        return _this;
    }

    function mapErr<T2>(operation: Function<T1, T2>): Err<T2> {
        return Err(operation(inspect()));
    }

    function restore<T2>(operation: Function<T1, T2>): Ok<T2> {
        return Ok(operation(inspect()));
    }

    function toOption(): Option<never> {
        return None;
    }

    function toString(): string {
        return type() + "(" + StringHandler().toString(inspect()) + ")" + "\n" + stack();
    }

    function display(): void {
        return console.log(toString());
    }
}