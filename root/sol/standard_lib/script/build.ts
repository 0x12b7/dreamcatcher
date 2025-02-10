import { Config } from "solion";
import { Compiler } from "solion";
import { readFileSync } from "fs";
import { writeFileSync } from "fs";
import { join } from "path";

(() => {
    Compiler.compile(Config({
        language: "Solidity",
        sources: {
            "address": {
                content: readFileSync(join(__dirname, "../src/base/address.sol"), "utf8")
            }
        },
        settings: {
            outputSelection: {
                "*": {
                    "*": [
                        "evm.bytecode.object"
                    ]
                }
            }
        }
    })).map(out => {
        writeFileSync(join(__dirname, "../target/evm/bytecode"), out.contracts?.["address"]?.["Address"]?.evm?.bytecode?.object ?? "");
    })
})();