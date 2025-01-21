import { Vec, type Option } from "@root";
import type { Closure } from "@root";
import type { Function } from "@root";

export type PoolEntity = {
    release(): void;
};

export type Pool<T1> = {
    borrow(): T1;
    release(): T1;
};



export type PooledConstructor<T1 extends Array<unknown>, T2> = Closure<T1, T2>;

export type Pooled<T1 extends Array<unknown>, T2> = [borrow: PooledConstructor<T1, T2>, release: () => void];

export function Pool<T1 extends Array<unknown>, T2>(_cs: PooledConstructor<T1, T2>): Pooled {}



export function Pools<T1 extends Array<unknown>, T2>(_constructor: Closure<T1, T2>): [() => [T2], () => void] {
    let _alloc: Vec<Option<T2>>;

    /** @constructor */ {
        _alloc = Vec([]);

        return (...payload: T1) => _borrow(...payload);
    }

    function _borrow(...payload: T1): T2 {
        return _alloc
            .filter(alloc => {
                return alloc.some();
            })
            .at(0n)
            .toResult(undefined)
            .map(alloc => {
                let inst: T2;
                alloc.map(object => {
                    inst = object;
                    return;
                });
                return inst!;
            })
            .unlockOr(_constructor(...payload));
    }
}


type Person = {

};

let [person, releasePerson] = Pool<[name: string], Person>((_name: string) => {
    /** @constructor */ {
        return {};
    }
})

releasePerson();

let [Person, release] = Pool(() => {

})

Person();
release();



let _pool: Pool<PoolEntity> = Pool();
let object0 = _pool.borrow();
let object1 = _pool.borrow();







object0.release();
object1.release();