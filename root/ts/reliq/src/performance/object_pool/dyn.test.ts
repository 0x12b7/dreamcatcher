import { Dyn } from "@root";
import { Alloc } from "@root";
import { DeAlloc } from "@root";

type Car = {
    drive(): void;
};

const Car: Dyn.Constructor<Car, []> = Dyn(
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

{
    let car$D: Dyn<Car> = Car();
    car$D.expect("DynTest: Instance not allocated.");
    car$D = car$D.deAlloc();
    car$D
        .toResult(undefined)
        .expectErr("DynTest: Instance was deallocated but still available.");    
}