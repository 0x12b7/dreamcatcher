import { Some, type Option } from "@root";
import type { Function } from "@root";

export type StringIsh = String | string;
export type StringHashAlgo = Function<string, string>;
export type String = {
    decrypt(value: StringIsh): boolean;
    encrypt(): String;
    encrypt(salt: bigint): String;
    encrypt(algo: StringHashAlgo): String;
};
export function String(_value: StringIsh): String {
    /** @constructor */ {

    }

    function decrypt(value: StringIsh): boolean {

    }

    function encrypt(): String;
    function encrypt(salt: bigint): String;
    function encrypt(algo: Function<string, string>): String;
    function encrypt(
        _0?: Function<string, string> | bigint
    ): String {
        if (typeof _0 === "bigint") {

        }

    }
}

let h = String("HelloWorld");
h.decrypt()