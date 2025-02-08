import { wrapAsync } from "@root";
import { build } from "tsup";

(async () => {
    (await wrapAsync(build, {
        entry: ["src/mod.ts"],
        outDir: "target/npm/",
        format: "cjs",
        sourcemap: "inline",
        config: "tsconfig.json",
        minify: "terser",
        bundle: true,
        dts: true,
        clean: true
    })).expect();
})();