import { Result } from "reliq";
import { Unsafe } from "reliq";
import { wrapAsync } from "reliq";
import { build } from "tsup";

export type BuildScript = {
    run(): Promise<Result<void, Unsafe>>;
};

export function BuildScript(): BuildScript {
    /** @constructor */ {
        return { run };
    }

    async function run(... []: Parameters<BuildScript["run"]>): ReturnType<BuildScript["run"]> {
        return await wrapAsync(build, {
            entry: ["src/mod.ts"],
            outDir: "target/tslib",
            format: ["cjs"],
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