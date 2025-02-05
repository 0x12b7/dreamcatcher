import { wrapAsync } from "@root:internal";
import { build } from "tsup";
import { join } from "path";
import { readdirSync } from "fs";
import { writeFileSync } from "fs";

/** @script */
(await wrapAsync(build, {
    entry: "src/mod.ts",
    outDir: "target/npm/",
    format: "cjs",
    sourcemap: "inline",
    config: "tsconfig.json",
    minify: "terser",
    bundle: true,
    dts: true,
    clean: true
})).expect("Failed to build.");

/// jsr lib 
let jsrTargetFolder: string = join(__dirname, "../target/jsr/");
let jsrTargetFile: string = join(jsrTargetFolder, "mod.ts");
let content: string = "export * from '../../src/mod.ts'";
writeFileSync(jsrTargetFile, content);