import { AsyncResult } from "@";
import { Unsafe } from "@";
import { ResultHandler } from "@";
import { build } from "tsup";

export type BuildScript = {
    run(): AsyncResult<void, Unsafe>
};

export function BuildScript(): BuildScript {
    /** @constructor */ {
        return { run };
    }

    async function run(): AsyncResult<void, Unsafe> {
        return await ResultHandler.wrapAsync(build, {
            entry: ["src/mod.ts"],
            outDir: "target/tslib",
            format: ["cjs"],
            bundle: true,
            dts: true,
            sourcemap: "inline",
            clean: true,
            minify: true,
            config: "tsconfig.json"
        });
    }
}

/** @script */
(await BuildScript()
    .run())
    .unwrap();