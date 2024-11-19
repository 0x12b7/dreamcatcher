import type {TranspileE} from "../lib/react/Transpile";
import type {TranspileR} from "../lib/react/Transpile";
import {Router} from "express";
import {Result} from "@seal";
import {Ok} from "@seal";
import {Err} from "@seal";
import {transpile} from "../lib/react/Transpile";
import {existsSync} from "fs";
import {join} from "path";

export type ReactRouterR = Result<ReactRouterT, ReactRouterE>;
export type ReactRouterT = Router;
export type ReactRouterE =
    | TranspileE
    | "ERR_OUTDIR_REQUIRED"
    | "ERR_TSX_REQUIRED"
    | "ERR_HTML_REQUIRED";
export async function ReactRouter(directory: string): Promise<ReactRouterR> {
    const tsx: string = join(directory, "App.tsx");
    const html: string = join(directory, "App.html");
    if (!existsSync(directory)) return Err("ERR_OUTDIR_REQUIRED");
    if (!existsSync(tsx)) return Err("ERR_TSX_REQUIRED");
    if (!existsSync(html)) return Err("ERR_HTML_REQUIRED");
    let r: TranspileR = await transpile(tsx, directory);
    if (r.err) return r;
    return Ok(Router().get("/", async (rq, rs) => rs.sendFile(html)));
}