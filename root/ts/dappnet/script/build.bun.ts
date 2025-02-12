import { wrapAsync } from "reliq";
import { build } from "tsup";

await wrapAsync(async () => {
    return await build({
        entry: ["src/mod.bun.ts"],
        outDir: "target/bun",
        format: ["cjs"],
        sourcemap: "inline",
        clean: true,
        minify: false,
        dts: true,
        config: "tsconfig.json"
    });
});