import { TsModule } from "@root";

import { Option } from "reliq";
import { flag } from "reliq";

import { join } from "path";

async function main(): Promise<void> {
    let processPayload: Array<string> = process.argv;
    let executorPath: string = flag(processPayload.at(0)).expect();
    let executedPath: string = flag(processPayload.at(1)).expect();
    let command: Option<string> = flag(processPayload.at(2));
    if (command.some()) {
        let command$0: string = command.unwrap();
        switch (command$0) {
            case "link":
                let dir: Option<string> = flag(processPayload.at(3));
                let dir$0: string = dir.unwrapOr("src");
                let dir$1: string = join(executedPath, dir$0);
                let mod: TsModule.Result<TsModule> = TsModule(dir$1);
                if (mod.err()) {
                    console.error(`Unable to locate '${ dir$1 }\\'.`);
                    return;
                }
                let mod$0: TsModule = mod.unwrap();
                mod$0
                    .link()
                    .expect();
                break;
        }
    }
}

main();