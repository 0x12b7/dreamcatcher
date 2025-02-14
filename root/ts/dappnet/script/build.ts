import { wrapAsync } from "reliq";
import { build } from "tsup";

await wrapAsync(async () => {
    return await build({
        entry: ["src/mod.ts"],
        outDir: "target/esm/",
        format: ["esm"],
        minify: "terser",
        sourcemap: true,
        clean: true,
        dts: true,
        config: "tsconfig.json"
    });
});