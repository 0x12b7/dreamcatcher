import { wrapAsync } from "reliq";
import { build } from "tsup";

await wrapAsync(async () => {
    return await build({
        entry: ["src/browser/mod.ts"],
        outDir: "target/browser",
        format: ["cjs"],
        sourcemap: "inline",
        clean: true,
        minify: "terser",
        dts: true,
        config: "tsconfig.json"
    });
});