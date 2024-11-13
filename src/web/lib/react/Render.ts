import type {Maybe} from "@common/util/base/Maybe";
import type {ReactNode} from "react";
import {createRoot as Root} from "react-dom/client";
import {assert} from "@common/util/base/Assert";

export function render(app: ReactNode): void {
    let element: Maybe<HTMLElement> = document.getElementById("root");
    assert(!!element, "ERR_RENDER_TARGET_REQUIRED");
    Root(element!).render(app);
    return;
}