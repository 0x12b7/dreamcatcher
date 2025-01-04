import { JsonRpcProvider, N } from "ethers";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Account } from "./Account";

export type NodeR = NodeT | NodeE;
export type NodeT = Ok<Node>;
export type NodeE = Err<[unknown]>;
export type Node = {
    url(): string;
    connect(key: string): Account;
};
export function Node(_url: string): NodeR {
    let _jsonRpcProvider: JsonRpcProvider;

    /** @constructor */ {
        let r: Result<void, unknown> =
            Result.wrap(() => {
                _jsonRpcProvider = new JsonRpcProvider(_url);
            });
        if (r.err()) return Err([r.val()]);
    }

    /** @constructor */ {
        return Ok({});
    }

    function url(): ReturnType<Node["url"]> {
        return _url;
    }

    function connect(...[key]: Parameters<Node["connect"]>): ReturnType<Node["connect"]> {
        return Account(key, _url);
    }
}


