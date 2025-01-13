import * as Root from "@root";

export type Span<T1> = {
    length(): bigint;
    at(position: bigint): Root.Option<T1>;
    join(): string;
    join(separator: string): string;
    
};