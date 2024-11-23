import type {Maybe} from "->std";
import type {ExecException} from "child_process";
import {Result} from "->std";
import {Ok} from "->std";
import {Err} from "->std";
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