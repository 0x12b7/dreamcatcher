import type {Maybe} from "root/ts/module/std/Index";
import type {ExecException} from "child_process";
import {Result} from "root/ts/module/std/Index";
import {Ok} from "root/ts/module/std/Index";
import {Err} from "root/ts/module/std/Index";
import {exec} from "child_process";

export type TranspileR = Result<TranspileT, TranspileE>;
export type TranspileT = void;
export type TranspileE =
    | ExecException;
export async function transpile(path: string, outdir: string): Promise<TranspileR> {
    let e: Maybe<ExecException> = await new Promise(resolve => exec(`bun build ${path} --outdir ${outdir}`, e => resolve(e)));
    if (e) return Err(e);
    return Ok(undefined);
}