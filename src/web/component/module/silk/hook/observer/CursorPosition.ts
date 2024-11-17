import {useState} from "react";
import {useEffect} from "react";

export type CursorPosition = {
    x: number;
    y: number;
};

export function useCursorPosition() {
    let [position, setPosition] = 
        useState<CursorPosition>({
            x: 0, 
            y: 0
        });

    useEffect(() => {
        window.addEventListener("mousemove", update);
        return () => window.removeEventListener("mousemove", update);
    
        function update(e: MouseEvent): void {
            setPosition({
                x: e.clientX, 
                y: e.clientY
            });
            return;
        }
    }, []);

    return position;
}