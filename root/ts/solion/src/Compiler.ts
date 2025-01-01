/// @ts-ignore
import { default as Solc } from "solc";
import { Configuration } from "@$";
import { Output } from "@$";
import { Result } from "reliq";

export type Compiler = {
    compile(configuration: Configuration): Result<Output, unknown>;
};
export const Compiler: Compiler = (() => {
    /***/ {
        return { compile };
    }

    function compile(...[configuration]: Parameters<Compiler["compile"]>): ReturnType<Compiler["compile"]> {
        return Result.wrap<Output>(() => JSON.parse(Solc.compile(JSON.stringify(configuration))));
    }
})();