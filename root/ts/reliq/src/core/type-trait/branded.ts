type Branded<T1 extends string> = {
    type(): T1;
};

export type { Branded };