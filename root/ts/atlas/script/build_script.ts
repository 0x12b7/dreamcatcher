import { build } from "bun";

(async () => {
    await build({
        entrypoints: ["src/app.ts"],
        outdir: "target/bun",
        format: "esm",
        target: "bun",
        sourcemap: "linked",
        minify: false
    });
})();