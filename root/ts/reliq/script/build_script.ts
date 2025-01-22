import type { Result } from "@root";
import { wrapAsync } from "@root";
import { Unsafe } from "@root";
import { build } from "tsup";

export type BuildScript = {
    run(): Promise<Result<void, Unsafe>>;
};

export function BuildScript(): BuildScript {
    /** @constructor */ {
        return {
            run
        };
    }

    async function run(): Promise<Result<void, Unsafe>> {
        return await wrapAsync(build, {
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
    .expect("Failed to complete build script.");