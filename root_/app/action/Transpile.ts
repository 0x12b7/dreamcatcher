import type {Maybe} from "->common";
import type {ExecException} from "child_process";
import {Result} from "->common";
import {Ok} from "->common";
import {Err} from "->common";
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