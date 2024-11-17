import type {RefObject} from "react";
import type {Element} from "@silk";
import type {Maybe} from "@common/util/base/Maybe";
import type {CursorPosition} from "@silk";
import {useState} from "react";
import {useEffect} from "react";
import {none} from "@common/util/base/None";

export function useRelativeCursorPosition(ref: RefObject<Element>) {
    let [position, setPosition] = 
        useState<CursorPosition>({
            x: 0,
            y: 0
        });
    
    useEffect(() => {
        let element: Maybe<Element> = ref.current;
        if (none(element)) return;
        element!.addEventListener("mousemove", update);
        return () => element!.removeEventListener("mousemove", update);

        function update(e: MouseEvent): void {
            let rect: DOMRect = element!.getBoundingClientRect();
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            return;
        }
    }, [ref]);

    return position;
}