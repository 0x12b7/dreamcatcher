import {
    type AsyncResult,
    ResultHandler,
    Unsafe
} from "@root";

import { 
    build 
} from "tsup";

export type BuildScript = {
    run(): AsyncResult<void, Unsafe>
};

export function BuildScript(): BuildScript {
    /** @constructor */ {
        return { run };
    }

    async function run(): AsyncResult<void, Unsafe> {
        return await ResultHandler.wrapAsync(build, {
            entry: ["src/core/mod.ts"],
            outDir: "target/tslib",
            format: "cjs",
            sourcemap: "inline",
            config: "tsconfig.json",
            bundle: true,
            dts: true,
            clean: true,
            minify: true
        });
    }
}

/** @script */
(await BuildScript()
    .run())
    .unwrap();