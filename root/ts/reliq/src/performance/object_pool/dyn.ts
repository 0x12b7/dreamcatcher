import type { Closure } from "@root";
import type { Wrapper } from "@root";
import { INTERNAL_ERROR_MESSAGE } from "@root";
import { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type Dyn<T1> = Alloc<T1> | DeAlloc<T1>;

/**
 * ***Brief***
 * A dynamic resource management pattern, allowing for
 * allocation and deallocation of resources with proper lifecycle handling.
 * 
 * ***Warning***
 * The `Dyn` wrapper must be properly managed to avoid memory leaks. If the wrapper itself is garbage collected 
 * without its content being explicitly deallocated, the resources it manages will not be recycled 
 * and made available for reuse. Ensure all allocated resources are deallocated before the `Dyn` instance goes out of scope.
 * 
 * ***Example***
 * ```ts
 *  type Car = {
 *      drive(): void;
 *  };
 * 
 *  const Car: DynConstructor<Car, [_model: string]> = Dyn(
 *      (_model: string) => {
 *          constructor {
 *              return { drive };
 *          }
 * 
 *          function drive(): void {
 *              return "Vroom.";
 *          }
 *      },
 *      car => {
 *          /// Reset car or any tasks before it is made available again.
 *          /// ...
 *          return car;
 *      }, 32n, "ModelT"
 *  );
 * 
 *  let car: Dyn<Car> = Car("ModelF");
 *  car = car.deAlloc();
 *  car.map(car => {
 *      /// Will not run because `car` has been deallocated.
 *      /// ...
 *  });
 * ```
 * 
 * ***Example***
 * ```ts
 *  /// Warning.
 *  let car: Dyn<Car> = Car("ModelB");
 *  car.deAlloc();
 *  car.map(car => {
 *      /// Will run because the car must be updated to the new state.
 *      /// Always assign the `deAlloc` result a new `Dyn` wrapper or
 *      /// itself.
 *      /// ...
 *  });
 * ```
 */
export function Dyn<T1, T2 extends Array<unknown>>(_constructor: Closure<T2, T1>, _onDeAlloc: Closure<[T1], T1>, _load: bigint, ..._onLoadPayload: T2): Dyn.Constructor<T1, T2> {
    let _available: Map<bigint, T1>;
    let _count: bigint;

    /** @constructor */ {
        _available = new Map();
        _count = 0n;
        let i: bigint = 0n;
        while (i < _load) {
            let key: bigint = _newKey();
            _available.set(key, _constructor(..._onLoadPayload));
            i ++;
        }
        return function (...payload: T2): Dyn<T1> {
            let _key: Option<bigint>;
            let _this: Dyn<T1>;
    
            /** @constructor */ {
                _key = None;
                return _this = alloc();
            }

            function alloc(): Alloc<T1> {
                return _recycledKey()
                    .toResult(undefined)
                    .map(key => {
                        _key = Some(key);
                        return Alloc(_recyled(key), { deAlloc });
                    })
                    .recover(() => {
                        _key = Some(_newKey());
                        return Alloc(_constructor(...payload), { deAlloc });
                    })
                    .unwrap();            
            }
    
            function deAlloc(): DeAlloc<T1> {
                _key
                    .toResult(undefined)
                    .map(key => {
                        /// If the key is available then it is allocated.
                        _key = None;
                        _recyle(key, _onDeAlloc(_this.expect("Dyn: Could not deallocate resource but the key was available." + INTERNAL_ERROR_MESSAGE)));
                        return;
                    });
                return _this = DeAlloc({ deAlloc });
            }
        };
    }

    function _newKey(): bigint {
        return _count += 1n;
    }

    function _recycledKey(): Option<bigint> {
        let key: bigint | undefined = _available
            .keys()
            .toArray()
            .at(0);
        if (!key) return None;
        return Some(key);
    }

    function _recyled(key: bigint): T1 {
        let value: T1 = _available.get(key)!;
        _available.delete(key);
        return value;
    }

    function _recyle(key: bigint, value: T1): void {
        _available.set(key, value);
        return;
    }
}

export namespace Dyn {
    export type Constructor<T1, T2 extends Array<unknown>> = Closure<T2, Dyn<T1>>;

    export type Wrapper<T1> = {

        /**
         * ***Brief***
         * Deallocates a resource, making it available for recycling.
         * 
         * ***Example***
         * ```ts
         *  let personD: Dyn<{ name: string }>;
         *  personD
         *      .deAlloc()
         *      .map(person => {
         *          /// Not run because `person` was deallocated.
         *          /// ...
         *      });
         * ```
         */
        deAlloc(): DeAlloc<T1>;
    };
}


export type Alloc<T1> =
    & Dyn.Wrapper<T1>
    & Some<T1>
    & Wrapper<T1>;
    
export function Alloc<T1>(_value: T1, _dyn: Dyn.Wrapper<T1>): Alloc<T1> {
    {
        return { ... Some(_value), ... _dyn };
    }
}


export type DeAlloc<T1> = 
    & None
    & Dyn.Wrapper<T1>;

/**
 * ***Brief***
 * The deallocated state of an allocated resource.
 */
export function DeAlloc<T1>(_dyn: Dyn.Wrapper<T1>): DeAlloc<T1> {
    {
        return { ... None, ... _dyn };
    }
}