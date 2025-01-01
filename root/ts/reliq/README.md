# Reliq
## Overview
Reliq is a TypeScript error-handling library inspired by Rust's robust error-handling mechanisms. Borrowing much of its foundational implementation from ts-results, Reliq goes further by striving to introduce highly safe and expressive tools like the Rust-like ? operator. The goal is to provide airtight type safety and make error handling in TypeScript seamless and intuitive.
## Features
- Rust-inspired Result and Option types: Reliq enables powerful and type-safe error handling.
- Planned Macro-like Utilities: Advanced utilities like the ? operator for short-circuiting errors in the works.
- Type Safety First: Reliq is designed to reduce runtime errors through TypeScript’s type system.
- Browser Compatibility: Fully compatible with browser environments.
- Assertion Utilities: Includes functions for assertion-based error handling.

## Rust Style
```typescript
    import { Option } from "reliq";
    import { Result } from "reliq";
    import { Ok } from "reliq";
    import { Err } from "reliq";

    type CarError =
        | "CAR.ERR_MISSING_ENGINE"
        | "CAR.ERR_MISSING_TIRE";

    type Car = {
        drive(): void;
    };

    function Car(engine: Option<string>, tire: Option<string>): Result<Car, CarError> {
        
    }
```


## Assertion Style
Assertion style programming unlike the Result style, is much cleaner however is less explicit. The core issue with typescript and javascript is how messy error handling can be, Reliq has some tools and guidelines to enabling better error management.

```typescript
    import type { Maybe } from "reliq";
    import { require } from "reliq";
    import { assert } from "reliq";
    import { mapErr } from "reliq";
    import { some } from "reliq":

    type CarError =
        | "CAR.ERR_MISSING_ENGINE"
        | "CAR.ERR_MISSING_TIRE"
        | "CAR.ERR_THIS_SHOULD_NEVER_HAPPEN";

    type Car = {
        drive(): void;
    };

    function Car(engine: Maybe<string>, tire: Maybe<string>): Car {
        /** @constructor */ {
            /// NOTE `require` and `assert` both perform the same exact operation, however,
            ///      it can be useful to distinguish between standard checks that are expected
            ///      to happen often, vs. impossible state or situations your code should never
            ///      be in.
            require<CarError>(some(engine), "CAR.ERR_MISSING_ENGINE");
            require<CarError>(some(engine), "CAR.ERR_MISSING_TIRE");

            /// NOTE `assert` assertions typically come after and at the end of a block of code.
            assert<CarError>(5 === 5, "CAR.ERR_THIS_SHOULD_NEVER_HAPPEN");

            return {
                drive
            };
        }

        function drive(): void {
            console.log("Vroom!");
            return;
        }
    }

    /// NOTE we can now use `mapErr` to match `require` and `assert` errors.
    try {
        Car(null, null);
    }
    catch (e: unknown) {
        /// WHERE
        ///     T is the error union type to select from.
        ///     X is the return type of the handler.
        mapErr<CarError, void>(e, "CAR.ERR_MISSING_ENGINE", () => {
            /// ...
            return;
        });
    }
```

License
Reliq is licensed under the MIT License.

