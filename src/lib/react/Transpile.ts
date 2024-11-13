import type {Maybe} from "@common/util/base/Maybe";
import type {ExecException} from "child_process";
import {exec} from "child_process";
import {assert} from "@common/util/base/Assert";

export async function transpile(path: string, outdir: string): Promise<void> {
    let e: Maybe<ExecException> = await new Promise(resolve => exec(`bun build ${path} --outdir ${outdir}`, e => resolve(e)));
    assert(!e, e?.name ?? "ERR_EXEC_EXCEPTION");
    return;
}