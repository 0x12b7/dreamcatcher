import type { State } from "@root";
import { useState } from "react";
import { useEffect } from "react";

export type Device = 
    | "DEVICE.LAPTOP"
    | "DEVICE.TABLET"
    | "DEVICE.MOBILE";

export function useDevice(): Device {
    let device: State<Device> = useState<Device>("DEVICE.LAPTOP");

    useEffect(() => {
        function resize(): void {
            if (window.innerWidth >= 1024) device[1]("DEVICE.LAPTOP");
            else if (window.innerWidth >= 768) device[1]("DEVICE.TABLET");
            else if (window.innerWidth >= 320) device[1]("DEVICE.MOBILE");
            else return;
        }

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    });

    return device[0];
}