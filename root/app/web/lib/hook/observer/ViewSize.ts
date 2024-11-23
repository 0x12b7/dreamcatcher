import {useState} from "react";
import {useEffect} from "react";

export type ViewSize = [
    w: number,
    h: number
];

export function useViewSize(): ViewSize {
    let [size, setSize] = 
        useState({
            w: window.innerWidth,
            h: window.innerHeight
        });
    
    useEffect(() => {
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);

        function resize(): void {
            setSize({
                w: window.innerWidth,
                h: window.innerHeight
            });
            return;
        }
    }, []);

    return [size.w, size.h];
}