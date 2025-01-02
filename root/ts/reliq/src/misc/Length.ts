
export type StringLengthOf<T extends string, X extends Array<number> = []> = T extends `${ string }${ infer Y }` ? StringLengthOf<Y, [... X, 0]> : X["length"];

export type Compare<T extends number, X extends number, Y extends Array<number> = []> = T extends X ? "==" : Y["length"] extends T ? "-" : Y["length"] extends X ? "+" : Compare<T, X, [... Y, 0]>;


export type StringMaxLength<T extends string, X extends number> = Compare<StringLengthOf<T>, X> extends "-" | "==" ? T : never;

let x: StringMaxLength<"fff", 3>;