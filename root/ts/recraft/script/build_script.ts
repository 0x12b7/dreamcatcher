import * as TypeScript from "tsup";
import { Result } from "reliq";
import { Unsafe } from "reliq";
import { wrapAsync } from "reliq";

export type BuildScript = {
    run(): Promise<Result<void, Unsafe>>;
};

export function BuildScript(): BuildScript {
    /** @constructor */ {
        return { run };
    }

    async function run(... []: Parameters<BuildScript["run"]>): ReturnType<BuildScript["run"]> {
        return await wrapAsync(TypeScript.build, {
            entry: ["src/mod.ts"],
            format: "cjs",
            outDir: "target/tslib",
            dts: true,
            minify: false,
            tsconfig: "tsconfig",
            platform: "browser" 
        });
    }
}

/** @script */
(await BuildScript()
    .run())
    .unwrap();