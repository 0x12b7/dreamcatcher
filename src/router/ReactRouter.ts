import {Router} from "express";
import {transpile} from "../lib/react/Transpile";
import {existsSync} from "fs";
import {join} from "path";
import {assert} from "@common/util/base/Assert";

export async function ReactRouter(directory: string): Promise<Router> {
    const tsx: string = join(directory, "App.tsx");
    const html: string = join(directory, "App.html");
    assert(existsSync(directory), "ERR_OUTDIR_REQUIRED");
    assert(existsSync(tsx), "ERR_TSX_REQUIRED");
    assert(existsSync(html), "ERR_HTML_REQUIRED");
    await transpile(tsx, directory);
    return Router().get("/", async (rq, rs) => rs.sendFile(html));
}