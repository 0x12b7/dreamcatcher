import { globby } from "globby";
import { readConfigFile, type MapLike, type ParsedCommandLine } from "typescript";
import { parseJsonConfigFileContent } from "typescript";
import { createSourceFile } from "typescript";
import { readFileSync, stat } from "fs";
import * as TypeScript from "typescript";
import { sys } from "typescript";
import { join } from "path";

async function main() {
    let files = (await globby("src/**/*.ts"));
    let root: string = join(__dirname, "../");
    let tsconfigPath: string = join(root, "tsconfig.json");
    let tsconfig: unknown = readConfigFile(tsconfigPath, sys.readFile)?.config;
    if (tsconfig === undefined) throw "ERR_TS_CONFIG_REQUIRED";
    let tsconfig$0: ParsedCommandLine = parseJsonConfigFileContent(tsconfig, sys, "./");
    let baseUrl: string | undefined = tsconfig$0.options?.baseUrl;
    if (baseUrl === undefined) throw "ERR_BASE_URL_REQUIRED";
    let aliases: MapLike<Array<string>> | undefined = tsconfig$0.options?.paths;
    if (aliases === undefined) throw "ERR_PATHS_REQUIRED";
    let aliasToPath: Map<string, Array<string>> = new Map();
    for (let alias in aliases) aliasToPath.set(alias, [aliases[alias][0]]);
    
    _resolve(files[2])
    
    function _resolve(sourceFilePath: string): string {
        let content: string = readFileSync(sourceFilePath, "utf8");
        let file = createSourceFile(sourceFilePath, content, TypeScript.ScriptTarget.ESNext, true);
        for (let statement of file.statements) {
            if (TypeScript.isImportDeclaration(statement)) {
                let alias: string = statement.moduleSpecifier.getText();
                let paths: Array<string> | undefined = aliasToPath.get(alias);
                console.log(paths);
            }
        }

        return ""
    }
}

main();