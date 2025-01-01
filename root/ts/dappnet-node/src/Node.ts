import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { JsonRpcProvider } from "ethers";

export type Contract = {

};

export type NodeR = NodeT | NodeE;
export type NodeT = Ok<Node>;
export type NodeE = Err<[unknown]>;
export type Node = {
    SyncedContract(_address: string);
    Contract(_address: string): Contract;
    url(): string;
};
export function Node(_url: string): NodeR {
    let _jsonRpcProvider: JsonRpcProvider;

    /** @constructor */ {
        let constructor: Result<void, [unknown]> =
            Result.wrap(() => {
                _jsonRpcProvider = new JsonRpcProvider(url());
            });
        if (constructor.err()) return Err([constructor.val()]);
        return Ok({ url });
    }

    function SyncedContract(_address: string) {

    }

    function Contract(_address: string): Contract {

    }

    function url(): ReturnType<Node["url"]> {
        return _url;
    }
}


let node: NodeR = Node("");
if (node.ok()) {
    let contract: Contract = node.unwrapSafely().Contract("");
    
}