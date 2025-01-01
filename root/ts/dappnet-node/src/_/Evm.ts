import type { NodeR } from "./Node";
import { Node } from "./Node";

export type Evm = {
    connect(url: string): NodeR;
};
export function Evm(): Evm {

    /** @constructor */ {
        
    }

    function connect(...[url]: Parameters<Evm["connect"]>): ReturnType<Evm["connect"]> {
        return Node(url);
    }
}