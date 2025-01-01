# Solion

## Wrapper for Solc with Enhanced Types & Utilities

### Abstract
The `solc` package did not come with working types so I built a wrapper around it with additional utilities. This package is extensible, every object comes with its own type ie. the `Compiler`.

### Example Usage
```typescript
import { Compiler } from "solion";
import { Output } from "solion";
import { Configuration } from "solion";
import { readFileSync } from "fs";
import { join } from "fs";

let output: Output = Compiler.compile(Configuration({
    language: "Solidity",
    sources: {
        "Math": {
            content: readFileSync(join(__dirname, "Math.sol"), "utf8")
        }
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 200
        },
        evmVersion: "london",
        outputSelection: {
            "*": {
                "*": [
                    "abi",
                    "devdoc",
                    "userdoc",
                    "evm.bytecode.object"
                ]
            }
        }
    }
})).unwrap();

if (!output?.errors) {
    console.log(
        output?.["Math"]?.["Math"]?.abi,
        output?.["Math"]?.["Math"]?.devdoc,
        output?.["Math"]?.["Math"]?.userdoc,
        output?.["Math"]?.["Math"]?.evm?.bytecode?.object
    );
}

```

### Known Issues

* `EvmSelector` from `dappnet` does not get bundled with the package for whatever reason.