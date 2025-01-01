import { build } from "tsup";

export type BuildScript = {
    run(): Promise<void>;
};

export function BuildScript(): BuildScript {
    /** @constructor */ {
        return {
            run
        };
    }

    async function run(): ReturnType<BuildScript["run"]> {
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
    }
}

/** @script */
await BuildScript().run();