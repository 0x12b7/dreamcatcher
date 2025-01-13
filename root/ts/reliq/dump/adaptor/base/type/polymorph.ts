export type Polymorph<T1> = {
    toArray(): Array<T1>;
    toString(): string;
    toLocaleString(): string;
};