import { Result } from "reliq";
import { Unsafe } from "reliq";
import { Ok } from "reliq";
import { JsonRpcProvider } from "ethers";
import { wrap } from "reliq";

export type Node = {

};

export function Node(_url: string): Result<Node, Unsafe> {
    let _jsonRpcProvider: JsonRpcProvider;

    /** @constructor */ {
        let jsonRpcProviderR: Result<JsonRpcProvider, Unsafe> = wrap(() => new JsonRpcProvider(_url));
        if (jsonRpcProviderR.err()) return jsonRpcProviderR;
        _jsonRpcProvider = jsonRpcProviderR.unwrapSafely();
        return Ok({});
    }

    
}