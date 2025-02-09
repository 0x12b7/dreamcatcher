import { TsModule } from "@root";

import { join } from "path";

(() => {
    TsModule(join(__dirname, "../src/"))
        .expect()
        .link()
        .mapErr(e => {
            if (typeof e === "object") {
                console.error(e.inspect());
                return;
            }
            return;
        })
})();