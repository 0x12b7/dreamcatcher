




### TS FOOP Style Guide

#### Abstract
Rust has shown to be one of the most robust languages in the space, but whilst it is fantastic. Whilst it is not OOP by design, it enabled for a functional style OOP. I was inspired by this to bring this to TS, I find it unacceptable that errors are `unknown` in a language that many use for large scale applications now a days. This is where I begun to experiment and learn how to bring this to TS.

#### File Naming Convention
PascalCase.

#### Variable Naming Convention
CamelCase.

#### Convention
```typescript
    r -> Result
    R -> Result
    e -> Error
    E -> Error
    t -> SuccessType
    T -> SuccessType
    v -> Value

    type MatchR = Result<MatchT, MatchE>;
    type MatchT = 500;
    type MatchE = 
        | "CANCELLED"
        | "OVERBOOKED"
        | "UNDERBOOKED";

    let r: MatchR;
    let e: MatchE;
    let t: MatchT;

    let __: string; /// Ignored
    let _: string; /// private
    let _steve: string /// private
    let __bob: string /// ignored
```


#### Constructor
CamelCase


###### 
Avoid naked objects.
```typescript
    let x: User = {
        /// what is this?
    };

    let x: User = User({
        /// yes
    });

```

###### F
There's a million ways to do the same thing in typescript, for consistency, only use types and not interfaces.
```typescript

    /// yes
    type Car = {

    };

    /// no
    interface Car {

    }



```

```typescript
    /// yes
    type Car =
        & Vehicle
        & {
        drive(): void;
    };
    
    /// no
    interface Car extends Vehicle {
        drive(): void;
    }



    /// no
    type Truck =
        & ({

        })
        & ({

        })


    /// yes
    type Truck1 = {

    };
    type Truck2 = {

    };
    type Truck =
        & Truck1
        & Truck2;
```


###### Example
```typescript



    /// Yes
    export type Aircraft = {

    };
    export function Aircraft(_name: string): Aircraft {

    }


    /// No
    /// The createAircraft is a `constructor` so why should it not be in PascalCase. It returns a new instance of an Aircraft.

    export interface Aircraft {

    }
    export function createAircraft(name: string): Aircraft {}


    /// Yes
    /// The function does not create a new instance of an Aircraft therefore it is
    /// not a constructor.
    function createAircraft(name: string) {
        return Aircraft();
    }

```

###### Error Handling

```typescript
    import type { ErrOf } from "reliq";
    import { Result } from "reliq";
    import { Ok } from "reliq";
    import { Err } from "reliq";

    type Car = {
        drive(): void;
    };
    async function Car(): Promise<
        | Ok<Car>
        | Err<"UNAVAILABLE">
        | Err<"BROKEN">> {
        /** @constructor */ {
            if (Date.now() >= 10 ** 10) return Err("UNAVAILABLE");
            else return Err("BROKEN");
            return Ok({ drive });
        }

        function drive(): void {
            return;
        }
    }

    /// We now have full type safety and the code is self documenting.
    (await Car())
        .mapErr(e => {
            if (e === "UNAVAILABLE") return;
            if (e === "BROKEN") return;
        })
        .map(car => car.drive());

    /// We can also handle it like this.
    let car = await Car();
    if (car.err()) return car;
    car.unwrapSafely().drive();


    /// we can now also ask for erroneous values of a type instead of just the type
    /// and we can explicitly ask for results, errors, or just the type itself.
    /// if its a result, it means the error is handled within the other object,
    /// if its just the type, it means any errors should be handled before passing
    /// it in, and if its an error, then it means only broken cars should be passed.
    ///
    /// this gives us explicit control over things that go wrong, where they are 
    /// handled, and how.
    function Garage(brokenCar: ErrOf<ReturnType<Car>>) {

    }

```

In the example above the `Car` function is a constructor which does not have to return a Car directly like in traditional OOP. In fact, it does not even return one
immidietly. It's a promise of a result.


###### Error Handling 1.2 : Working with Unsafe Code

```typescript
    import { Result } from "reliq";

    function unsafe(): string {
        throw Error("You did not know I could throw an Error.");
    }

    let r: Result<string, unknown> = Result.wrap(unsafe);

    /// Fundamentally even if the type of error is not present, now the consumer
    /// is aware that it does infact throw an error, or that it may or may not.
```



###### Import 1.0 : Order
```typescript
    import type { } from "";            /// 1 -> type
    import { default as X } from "";    /// 2 -> default
    import { Class } from "";           /// 3 -> class, constructors, namespace
    import { function } from "";        /// 4 -> functions
    import * as Y from "";              /// 5 -> grouped

```

###### Import : Scannable
Prefer easily scannable imports over single line imports.
```typescript
    /// no
    import { Result, Ok, Err } from "reliq";

    /// yes
    import { Result } from "reliq";
    import { Ok } from "reliq";
    import { Err } from "reliq";


```


###### 


