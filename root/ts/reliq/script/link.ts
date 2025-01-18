import { writeFileSync } from "fs";
import { readdirSync } from "fs";
import { join } from "path";
import { relative } from "path";

/// Note to self this is an awesome idea, I'm going to make a
/// manager for this.

/** @script */
let rootDirectoryPath: string = __dirname;
let modDirectoryPath: string = join(rootDirectoryPath, "../src/core");
let modFilePath: string = join(modDirectoryPath, "mod.internal.ts");
let filePaths: Array<string> = _lookUpFiles(modDirectoryPath);
let output: string = "";
filePaths.forEach(filePath => {
    if (filePath.includes("mod")) return;
    let relativePath: string = relative(modDirectoryPath, filePath).replace(/\\/g, "/");
    output += _import("./" + relativePath) + "\n";
    return;
});
writeFileSync(modFilePath, output);

function _lookUpFiles(directory: string): Array<string> {
    let paths: Array<string> = [];
    readdirSync(directory, { withFileTypes: true }).forEach(value => {
        let path: string = join(directory, value.name);
        if (value.isDirectory()) return paths = paths.concat(_lookUpFiles(path));
        if (value.isFile() && path.endsWith(".ts")) return paths.push(path);
        return;
    });
    return paths;
}

function _import(filePath: string): string {
    return `export * from "${ filePath }";`;
}