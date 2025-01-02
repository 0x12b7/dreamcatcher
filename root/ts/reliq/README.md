# Reliq
Reliq is a TypeScript error-handling library that draws inspiration from Rust's rigorous error-handling paradigms and the Ethereum Virtual Machine's (EVM) state management mechanisms. The library implements two principal approaches to error management: a Rust-inspired Result style, rooted in the design of ts-results, and an assertion-based approach.


## Resut Style

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
        /** @constructor */ {
            if (engine.none()) return Err("CAR.ERR_MISSING_ENGINE");
            if (tire.none()) return Err("CAR.ERR_MISSING_TIRE");
            return Ok({
                drive
            });
        }

        function drive(): void {
            /// ...
            return;
        }
    }
```


## Assertion Style

Assertion-style programming, in contrast to the Result style, offers a cleaner and more straightforward approach to error handling. However, it tends to be less explicit in how errors are managed. One of the core challenges with error handling in TypeScript and JavaScript is their inherently messy and inconsistent practices. Reliq addresses this problem by providing a set of tools and guidelines designed to streamline and improve error management, making it more intuitive and maintainable.

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

            /// NOTE `assert` assertions typically come after the end of a block of code.
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

Inspired by the EVM and Solidity's reversion mechanism, csreating restorable state can help build stronger and more robust code.
```typescript
    import { Restorable } from "reliq";
    import { panic } from "reliq";

    type RestorablePerson = 
        Restorable<{
            name: string;
            age: bigint;
        }>;

    let person: RestorabePerson = Restorable({ name: "Steve", age: 40n });

    /// NOTE when an error is thrown within the mut block it will revert the data
    ///      back to the state it was in before the block. the error will keep on
    ///      propagating after restoring its state.
    try {
        person.mut(person => {
            person.age += 1n;
            panic("ERR_ITS_NOT_YOUR_BIRTHDAY_YET");
        });
    }
    catch {}

    person.get(); /// person.age > 40n
```


## License
Reliq is licensed under the MIT License.