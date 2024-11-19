import type {ReactNode} from "react";
import type {MouseEvent} from "react";
import {config as SpringConfig} from "react-spring";
import {useSpring} from "react-spring";
import {useState} from "react";
import {useEffect} from "react";
import {animated} from "react-spring";
import * as ColorPalette from "@style/ColorPalette";

export type WindowProps = {
    initW: number;
    initH: number;
    initX: number;
    initY: number;
    children?: ReactNode;
};
export function Window(props: WindowProps): ReactNode {
    let {
        initW,
        initH,
        initX,
        initY,
        children
    } = props;
    let [isDragging, setIsDragging] = useState<boolean>(false);
    let [fromDragPosition, setFromDragPosition] = useState({x: 0, y: 0});
    let [drag, setDrag] = 
        useSpring(() => ({
            x: initX,
            y: initY,
            config: SpringConfig.stiff
        }));

    function onMouseDown(e: MouseEvent): void {
        setIsDragging(true);
        setFromDragPosition({
            x: e.clientX - drag.x.get(),
            y: e.clientY - drag.y.get()
        });
        return;
    }

    function onMouseMove(e: MouseEvent): void {
        if (isDragging) 
            setDrag.start({
                x: e.clientX - fromDragPosition.x,
                y: e.clientY - fromDragPosition.y
            });
        return;
    }

    function onMouseUp(): void {
        setIsDragging(false);
        return;
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", (onMouseMove as any));
            window.addEventListener("mouseup", onMouseUp);
        }
        else {
            window.removeEventListener("mousemove", (onMouseMove as any));
            window.removeEventListener("mouseup", onMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", (onMouseMove as any));
            window.removeEventListener("mouseup", onMouseUp);
            return;
        };
    }, [isDragging]);

    return <>
        <animated.div
            onMouseDown={onMouseDown}
            style={{
                position: "absolute",
                width: initW,
                height: 32,
                background: ColorPalette.TIMPERWOLD,
                cursor: isDragging ? "grabbing" : "grab",
                minWidth: 100,
                ... drag
            }}>
            <div
                style={{
                    position: "relative",
                    color: ColorPalette.TIMPERWOLD,
                    marginTop: 32,
                    background: ColorPalette.ONYX
                }}>
                Hello
            </div>
        </animated.div>
    </>;
}