/// @ts-ignore
import { default as Solc } from "solc";

import { Config } from "@root";
import { Output } from "@root";
import { Unsafe } from "reliq";
import { Result } from "reliq";
import { Ok } from "reliq";
import { wrap } from "reliq";

export type Compiler = {
    compile(config: Config): Result<Output, Unsafe>;
};

export const Compiler: Compiler = (() => {
    /***/ {
        return { compile };
    }

    function compile(... [config]: Parameters<Compiler["compile"]>): ReturnType<Compiler["compile"]> {
        let cargoR: Result<string, Unsafe> = wrap(JSON.stringify, config);
        if (cargoR.err()) return cargoR;
        let cargo: string = cargoR.unwrapSafely();
        let contentR: Result<string, Unsafe> = wrap(Solc.compile, cargo);
        if (contentR.err()) return contentR;
        let content: string = contentR.unwrapSafely();
        let outR: Result<unknown, Unsafe> = wrap(JSON.parse, content);
        if (outR.err()) return outR;
        let out: unknown = outR.unwrapSafely();
        return Ok((out as Output));
    }
})();