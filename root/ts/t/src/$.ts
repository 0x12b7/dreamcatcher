import { writeFileSync } from "fs";
import { readFileSync } from "fs";
import { mkdirSync } from "fs";
import { join } from "path";


type Repository = {
    name(): string;
    version(): string;
    directory(): string;
    deps(): Array<string>;
    storeVersion(version: string): void;
};
function Repository(_name: string, _version: string, _directory: string, _deps: Array<string>, _rootDirectory: string): Repository {
    /***/ {
        return { name, version, deps };
    }

    function name(): string {
        return _name;
    }

    function version(): string {
        return _version;
    }

    function deps(): Array<string> {
        return _deps;
    }

    function storeVersion(version: string) {

    }
}



function Cache() {

    
}


type Config = {
    deps: Array<string>;
};

type PackageManager = {

};
function PackageManager(directory: string) {
    /***/ {
        mkdirSync(join(directory, "cache/atlas"));
    }


    function init(directory: string) {
        mkdirSync(join(directory, "import"));

        writeFileSync(join(directory, "atlas.config.json"), JSON.stringify({
            
        }));
    }

    function install(directory: string) {
        let config = JSON.parse(readFileSync(join(directory, "atlas.ts"), "utf8"));
        let dependencies = config?.dependency;

    }

    function bundle(entrypoint: string) {

    }
} 