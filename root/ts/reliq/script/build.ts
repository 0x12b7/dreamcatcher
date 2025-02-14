import { wrapAsync } from "@root";
import { build } from "tsup";

(async () => {
    (await wrapAsync(build, {
        entry: ["src/mod.ts"],
        outDir: "target/esm/",
        format: "esm",
        config: "tsconfig.json",
        minify: "terser",
        bundle: true,
        sourcemap: true,
        dts: true,
        clean: true
    })).expect();
})();