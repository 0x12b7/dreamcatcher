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

Car().map(car => {
    /// ...
});

```

## Style Guide
#### Introduction
This style guide establishes conventions and best practices for writing robust TypeScript code while leveraging the full potential of Reliq. By adhering to these guidelines, developers can create maintainable, safe, and efficient applications using the powerful patterns inspired by Rust's `Result` and `Option` types.

#### Using Option
Prefer `Option` for nullable or optional values instead of `null` or `undefined`.
```ts
/// No
let value: string | null = null;

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

## License
Reliq is licensed under the MIT License.

## Aknowledgements
The `Result` and `Option` mechanism was taken from `ts-results`.