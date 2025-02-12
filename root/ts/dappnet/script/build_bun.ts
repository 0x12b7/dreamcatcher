import { wrapAsync } from "reliq";
import { build } from "tsup";

await wrapAsync(async () => {
    return await build({
        entry: ["src/bun/mod.ts"],
        outDir: "target/bun",
        format: ["cjs"],
        sourcemap: "inline",
        clean: true,
        minify: "terser",
        dts: true,
        config: "tsconfig.json"
    });
});