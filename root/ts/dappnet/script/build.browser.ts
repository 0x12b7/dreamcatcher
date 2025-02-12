import { wrapAsync } from "reliq";
import { build } from "tsup";

await wrapAsync(async () => {
    return await build({
        entry: ["src/mod.browser.ts"],
        outDir: "target/browser",
        format: ["cjs"],
        sourcemap: "inline",
        clean: true,
        minify: false,
        dts: true,
        config: "tsconfig.json"
    });
});