import type { DynConstructor } from "@root";
import { Dyn } from "@root";

/** @script */
type Car = {
    drive(): void;
};

const Car: DynConstructor<Car, []> = Dyn(
    () => {
        /** @constructor */ {
            return { drive };
        }

        function drive(): void {
            return;
        }
    },
    car => {
        return car;
    }, 5n
);

let carD: Dyn<Car> = Car();
carD.expect("DynTest: Instance not allocated.");
carD = carD.deAlloc();
carD
    .toResult(undefined)
    .expectErr("DynTest: Instance was deallocated but still available.");
