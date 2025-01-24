# Reliq
## TypeScript for Ridiculously Robust Code
Reliq is a TypeScript error-handling library inspired by Rust's error paradigms. It attempts to port over useful constructs in a way that makes them feasible to use in TypeScript.

#### Breaking Changes
* `Option` and `Result` no longer use `unwrap`. They must now be handled explicitly.
* Standard `unwrap` and `unwrapOr` methods have been replaced with `unlock` and `unlockOr`. Unlike `unwrap`, `unlock` is only available on `Ok`, `Some`, and `Alloc` and does not `throw`.
* Assertion API has been deprecated to align the library.
* `Recoverable` and some deprecated API may make a come back in a more type-safe form.

#### API Overview
##### Performance
`Dyn` recycles instances to reduce garbage collection. It uses `Option` under the hood to enforce safe access to the instance which may or may not be allocated. The wrapper itself will be garbage collected, caution is required to avoid memory leaks.
```ts
import type { DynConstructor } from "reliq";
import { Dyn } from "reliq";

type Car = {
    drive(): void;
};

const Car: DynConstructor = Dyn(
    () => {
        /** @constructor */ {
            return { drive };
        }

        function drive(): void;
    },
    car => {
        /// Reset or process car on deallocation.
        /// ...
        return car;
    }, 5n
);

let carD: Dyn<Car> = Car();
carD.map(car => {
    /// Will run because `carD` was allocated.
    /// ...
});
carD = carD.deAlloc();
/// Car is now deallocated, recycled, and ready to be reallocated without being garbage collected.
/// ...
```
##### Result
When things go right TypeScript is always there to help you, but when things go wrong, you're on your own. The `Result` pattern improves the robustness of your code by mapping out all cases.
```ts
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Error } from "reliq";

type CarErrorCode =
    | "CAR.ERR_MISSING_ENGINE
    | "CAR.ERR_MISSING_TIRE;

type CarError = Error<CarErrorCode>;

type Car = {
    drive(): void;
};

function Car(): Result<Car, CarError> {
    /** @constructor */ {
        if () return Err(Error("CAR.ERR_MISSING_ENGINE", "Car: looks like there's no engine."));
        return { drive };
    }

    function drive(): void;
}

Car()
    .map(car => {
        /// ...
    })
    .mapErr(e => {
        console.log("Failed to initialize car.", e);
        return;
    });
```

##### Option
```ts
function foo(): Option<bigint> {
    if () return Some(200n);
    return None;
}

/** Declarative. */
foo()
    .and(value => {
        if () return None;
        return Some(value + 1n);
    })
    .and(value => {
        /// ...
    });

/** Imperative. */
let fooO: Option<bigint> = foo();
if (fooO.none()) return fooO;
let foo: bigint = fooO.unlock();
```


## Style Guide
This style guide establishes conventions and best practices for writing robust TypeScript code while leveraging the full potential of Reliq. By adhering to these guidelines, developers can create maintainable, safe, and efficient applications using the powerful patterns inspired by Rust's `Result` and `Option` types.

#### Using Option
Use `Option` over `null` or `undefined`.
```ts
/**
 * ***Bad***
 * Will not be handled explicitly.
 * 
 */
let value: string | null = null;


/**
 * ***Good***
 * Will require explicit handling.
 * Will 
 */
/// Yes
let value: Option<string> = None;
```
```ts
/// No
function foo(bar?: string): void {
    if (bar) {
        /// ...
    }
}

/// Yes
function foo(bar?: string): void {
    flag(bar).map(bar => {

    });
}
```

#### Functional Object Oriented Programming

###### Class
```ts
/**
 * ***No***
 * * Will not support `Result` and `Option` constructor.
 * * Will not support `async` constructor.
 * * Will require `new` keyword.
 * * Will require `this` keyword. 
 */
class Foo {
    constructor() {

    }
}


/**
 * ***Yes*** 
 * * Will support `Result` and `Option` contructor.
 * * Will support `async` constructor.
 * * Will not require `new` keyword.
 * * Will not require `this` keyword.
 */

type Foo = {

};

function Foo(): Async<Result<Foo, Error>> {
    /** @constructor */ {

    }
}
```


#### Math
Prefer `bigint` instead of `number` for all operations.

```ts
/**
 * ***No***
 * * Will underflow and overflow silently causing unexpected behaviour.
 * * Will cause imprecise floating point math and rounding errors.
 */
let value: number = 12.50;

/**
 * ***Yes***
 * * Will represent large integers without precision loss.
 * * Will not silently overflow and underflow.
 * * Will not produce floating point rounding errors.
 */
let value0: bigint;
let value1: Fpv<2n> = Fpv(1250n).expect("Failed to initialize `Fpv<2n>`.");
value1 = value1.mul(50n);
console.log(value1); /// 625n (6.25).
```

#### FAQ
###### When should I prefer `Result` over traditional exceptions?
Exceptions are for unexpected and unrecoverable errors, most errors will end up being expected and recoverable. You can use
`panic` to throw `Error`.

###### Why should I use `Option` or `Result`?
* ***Avoid Runtime Errors***: By handling errors and nullability explicitly at compile time, you reduce the likelihood of runtime crashes.
* ***Early Error Detection***: Since `Err` or `None` states must be handled explicitly, you are less likely to introduce bugs due to unhandled cases.


## License
Reliq is licensed under the MIT License.

## Aknowledgements
The `Result` and `Option` mechanism was taken from `ts-results`.