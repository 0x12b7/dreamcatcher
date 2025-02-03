import { wrapAsync } from "@core";
import { build } from "tsup";
import { join } from "path";
import { readdirSync } from "fs";

/** @script */
let root: string = join(__dirname, "../src/");
readdirSync(root, { withFileTypes: true }).forEach(ent => {
    if (ent.isDirectory()) {
        console.log(ent.name);
    }
});
(await wrapAsync(build, {
    entry: [
        "src/core/mod.ts",
        "src/math/mod.ts"
    ],
    outDir: "target/tslib",
    format: "cjs",
    sourcemap: "inline",
    config: "tsconfig.json",
    minifyIdentifiers: false,
    minifySyntax: false,
    keepNames: true,
    bundle: true,
    dts: true,
    clean: true
})).expect("Failed to build.");