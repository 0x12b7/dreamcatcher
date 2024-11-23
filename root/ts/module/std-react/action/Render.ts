import type {Maybe} from "->std";
import type {Component} from "->std-react";
import {Result} from "->std";
import {Ok} from "->std";
import {Err} from "->std";
import {createRoot as Root} from "react-dom/client";

export type RenderR = Result<RenderT, RenderE>;
export type RenderT = void;
export type RenderE =
    | "ERR_RENDER_TARGET_REQUIRED";
export function render(app: Component): RenderR {
    let element: Maybe<HTMLElement> = document.getElementById("root");
    if (!element) return Err("ERR_RENDER_TARGET_REQUIRED");
    Root(element!).render(app);
    return Ok(undefined);
}