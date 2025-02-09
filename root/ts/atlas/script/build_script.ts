import { build } from "bun";

async function main() {
    await build({
        entrypoints: ["src/app.ts"],
        outdir: "target/v8",
        format: "iife",
        target: "bun",
        minify: true
    });
}

main();