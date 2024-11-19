import type {Maybe} from "@seal";
import type {ExecException} from "child_process";
import {Result} from "@seal";
import {Ok} from "@seal";
import {Err} from "@seal";
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