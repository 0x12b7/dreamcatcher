import type {MutableRefObject} from "react";
import type {Maybe} from "->common";
import {useState} from "react";
import {useEffect} from "react";
import {useCallback} from "react";
import {useRef} from "react";

export function useSize<T extends HTMLElement>(): [rf: MutableRefObject<Maybe<T>>, w: number, h: number] {
    let rf = useRef<Maybe<T>>(null);
    let [size, setSize] = useState<{w: number, h: number}>({w: 0, h: 0});

    const update = useCallback(() => {
        if (!rf.current) return;
        let {width, height} = rf.current.getBoundingClientRect();
        setSize({
            w: width,
            h: height
        });
        return;
    }, []);

    useEffect(() => {
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [update]);

    return [rf, size.w, size.h];
}