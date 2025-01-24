# Reliq
## TypeScript for Ridiculously Robust Code
Reliq is a TypeScript error-handling library inspired by Rust's error-handling paradigms. It  brings over useful constructs in a way that makes them practical to use in TypeScript.

#### Breaking Changes
* The `Option` and `Result` types no longer include `unwrap`. They now require explicit handling.
* Standard `unwrap` and `unwrapOr` methods have been replaced with `unlock` and `unlockOr`. Unlike `unwrap`, `unlock` is only available on `Ok`, `Some`, and `Alloc` variants and will not throw errors.
* The assertion API has been depracated to better align with the rest of the library's design.
* `Recoverable` and other depracated APIs may return in a more type-safe format in the future.

## API Overview
#### Result
TypeScript will not map error cases, which causes `unknown`, undocumented, and unexplicit code to be blow up at runtime. The `Result` pattern increases code robustness by explicitly handling all possible outcomes at "result-time". Code is will now explicitly require proper handling or aknowledgement when something can go wrong.
```ts
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Error } from "reliq";

type CarErrorCode =
    | "CAR.ERR_MISSING_ENGINE"
    | "CAR.ERR_MISSING_TIRE";

type CarError = Error<CarErrorCode>;

type Car = {
    speed(): bigint;
};

function Car(): Result<Car, CarError> {
    /** @constructor */ {
        if () return Err(Error("CAR.ERR_MISSING_ENGINE", "Car: looks like there's no engine."));
        return { speed };
    }

    function speed(): bigint {
        return 200n;
    }
}

/// Declarative handling.
Car()
    .map(car => {
        /** ... */
    })
    .mapErr(e => {
        /** ... */
    });

/// Imperative handling.
function main() {
    let carR: Result<Car, CarError> = Car();
    if (carR.err()) return carR;
    let car: Car = carR.unlock();
}
```

#### Option
Optional or missing values can be safely and explicitly handled using `Option`.
```ts
import { Option } from "reliq":
import { Some } from "reliq";
import { None } from "reliq";

function foo(): Option<bigint> {
    if () return Some(200n);
    return None;
}

/// Declarative handling.
foo().map(foo => {
    /** ... */
});

/// Imperative handling.
function main() {
    let fooO: Option<bigint> = foo();
    if (fooO.none()) return fooO;
    let foo: bigint = fooO.unlock();
}
```

#### Performance
`Dyn` optimizes garbage collection by recycling instances. It uses `Option` under the hood to ensure safe access to instances, which may or may not be allocated. The wrapper can still be garbage collected, caution is required to avoid memory leaks.
```ts
import type { DynConstructor } from "reliq";
import { Dyn } from "reliq";

type Car = {
    reset(): Car;
};

const Car: DynConstructor = Dyn(
    () => {
        let _this: Car;

        /** @constructor */ {
            return _this = { reset };
        }

        function reset(): Car {
            return _this;
        }
    },
    
    /// The `onDeAlloc` task.
    car => car.reset(),

    /// The amount of instances to create and store.
    1000n
);

let carD: Dyn<Car> = Car();
carD.map(car => {
    /// Will run because `carD` is allocated.
    /// ...
});
carD = carD.deAlloc();
/// Car is now deallocated, recyled, and ready to be reallocated without being garbag collected.
/// ...
```

#### Math
Use `Fpv` for fixed point arithmetics instead of `number` for more robust and predictable math.
```ts
    import { Fpv } from "reliq";

    let price: Fpv<2n> = Fpv(2000n).expect("Failed to initialize `Fpv<2n>`."); /// 20.00
    price = price.mul(50n); /// 0.50
    console.log(price); /// 10.00 1000n
```