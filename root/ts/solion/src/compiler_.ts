/// @ts-ignore
import { default as Solc } from "solc";

import { Configuration } from "@root";
import { Output } from "@root";
import { Unsafe } from "reliq";
import { Result } from "reliq";
import { Ok } from "reliq";
import { wrap } from "reliq";

type Result$0<T1, T2> = Result<T1, T2>;

export type Compiler = {
    compile(configuration: Configuration): Compiler.Result<Output>;
};

export const Compiler: Compiler = (() => {
    /***/ {
        return { compile };
    }

    function compile(configuration: Configuration): Compiler.Result<Output> {
        let cargoR: Result<string, Unsafe> = wrap(JSON.stringify, configuration);
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

export namespace Compiler {
    export type Result<T1> = Result$0<T1, Unsafe>;
}