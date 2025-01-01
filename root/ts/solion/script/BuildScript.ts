import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { build } from "tsup";

type BuildScript = {
    run(): Promise<
        | Ok<void>
        | Err<unknown>>;
};
function BuildScript(): BuildScript {
    /***/ {
        return { run };
    }

    async function run(): ReturnType<BuildScript["run"]> {
        let r: Result<void, unknown> = 
            await Result.wrapAsync(async () => await build({
                entry: ["src/$.ts"],
                outDir: "target/tslib",
                format: ["esm"],
                dts: true,
                sourcemap: "inline",
                clean: true,
                minify: true,
                minifyIdentifiers: true,
                minifySyntax: true,
                minifyWhitespace: true,
                config: "tsconfig.json",
                external: []
            }));
        if (r.err()) return r;
        return Ok(undefined);
    }
}

BuildScript().run().then(v => v.unwrap());