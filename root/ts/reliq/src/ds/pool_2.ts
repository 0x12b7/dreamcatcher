import type { Closure } from "@root";
import type { Option } from "@root";
import type { Some } from "@root";
import type { None } from "@root";

export type PoolEntSome<T1> =
    & Some<T1>
    & PoolEnt;

export type PoolEntNone = 
    & None
    & PoolEnt;

export type PoolEntOption<T1> = PoolEntSome<T1> | PoolEntNone;



export type PoolEnt = {
    deAlloc(): void;
};

export type PoolConstructor<
    T1 extends Array<unknown>, 
    T2
> = Closure<T1, T2>;

export function Pool<
    T1 extends Array<unknown>,
    T2>
    (_Constructor: PoolConstructor<T1, T2>): 
    (Closure<T1, T2 & PoolEnt>) {
    let _pool: Array<Option<T2>>;

    /** @constructor */ {
        _pool = [];
        return (... payload) => _alloc(...payload);
    }

    function _alloc(...payload: T1): T2 & PoolEnt {
        
        function deAlloc(this: T2 & PoolEnt) {
            _pool.
        }
    }
}


type Monster = {
    sayHello(): string;
};

type MonsterEnt = 
    & PoolEnt
    & Monster;

const Monster = Pool<[_name: string], Monster>((_name: string) => {
    /** @constructor */ {
        return { sayHello };
    }

    function sayHello(): string {
        return "HelloWorld";
    }
});

let monsterMO: PoolEntOption<Monster> = Monster("MyName");


monsterMO.deAlloc();
monsterMO.map(monster => {
    /// Safe this will only happen if mMO is allocated.
    monster.sayHello();
});