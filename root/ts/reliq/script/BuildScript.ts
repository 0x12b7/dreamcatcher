import { Ok } from "@root";
import { Result } from "@root";
import { wrapAsyncR } from "@root";
import { build } from "tsup";

export type BuildScript = {
    run(): Promise<Result<void, unknown>>;
};

export function BuildScript(): BuildScript {
    /** @constructor */ {
        return { run };
    }

    async function run(): ReturnType<BuildScript["run"]> {
        let r: Result<void, unknown> = 
            await wrapAsyncR(async () => {
                return await build({
                    entry: ["src/Module.ts"],
                    outDir: "target/tslib",
                    format: ["cjs"],
                    bundle: true,
                    dts: true,
                    sourcemap: "inline",
                    clean: true,
                    minify: true,
                    config: "tsconfig.json"
                });
            });
        if (r.err()) return r;
        return Ok(undefined);
    }
}

/** @script */
let script: BuildScript = BuildScript();
let r = await script.run();
r.unwrap();