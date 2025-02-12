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
        config: "tsconfig.json"
    });
});

await wrapAsync(async () => {
    return await build({
        entry: ["src/mod.browser.ts"],
        outDir: "target/browser",
        format: ["cjs"],
        sourcemap: "inline",
        clean: true,
        minify: false,
        config: "tsconfig.json"
    });
});