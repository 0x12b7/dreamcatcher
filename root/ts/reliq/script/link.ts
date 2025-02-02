import { readFileSync } from "fs";
import { writeFileSync } from "fs";
import { readdirSync } from "fs";
import { join } from "path";
import { relative } from "path";

/** @script */
_link("/common");
_link("/core");

function _link(directory: string) {
    let root: string = join(__dirname, "../src/");
    let moduleDirectory: string = join(root, directory);
    let moduleFile: string = join(moduleDirectory, "mod.internal.ts");
    let sorted: Array<string> = [];
    let set: Array<Array<string>> = [];
    let out: string = "";
    _typeScriptFiles(moduleDirectory).forEach(file => {
        let raise: bigint = 0n;
        try {
            raise = _raise(file);
        }
        catch {}
        set[Number(raise)] ??= [];
        set[Number(raise)].push(file);
        return;
    });
    set.forEach(files => {
        files.forEach(file => {
            sorted.push(file);
            return;
        });
        return;
    });
    sorted
        .reverse()
        .forEach(file => {
            if (file.includes("mod")) return;
            if (file.includes("test.ts")) return;
            let path: string = relative(moduleDirectory, file).replace(/\\/g, "/");
            out += _import("./" + path) + "\n";
            return;
        });
    writeFileSync(moduleFile, out);
    return;
}

function _typeScriptFiles(moduleFolder: string): Array<string> {
    let result: Array<string> = [];
    readdirSync(moduleFolder, { withFileTypes: true }).forEach(item => {
        let path: string = join(moduleFolder, item.name);
        let isFolder: boolean = item.isDirectory();
        let isFile: boolean = item.isFile();
        let isTypeScriptFile: boolean = isFile && path.endsWith(".ts");
        if (isFolder) return result.push(... _typeScriptFiles(path));
        if (isTypeScriptFile) return result.push(path);
        return;
    });
    return result;
}

function _raise(typeScriptPath: string): bigint {
    let tk: Array<string> = readFileSync(typeScriptPath, { encoding: "utf8" })
        .split(";")
        .at(0)
        ?.replaceAll('"', "")
        ?.split(" ") || [];
    if (tk.length !== 2) return 0n;
    let el0: string = tk[0];
    let el1: string = tk[1];
    if (el0 !== "raise") return 0n;
    return BigInt(el1);
}

function _import(filePath: string): string {
    return `export * from "${ filePath }";`;
}