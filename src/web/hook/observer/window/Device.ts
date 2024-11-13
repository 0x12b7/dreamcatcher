import {useState} from "react";
import {useEffect} from "react";

export type Device = "laptop" | "tablet" | "mobile";

export function useDevice(): Device {
    const [device, setDevice] = useState<Device>("laptop");

    function resize(): void {
        if (window.innerWidth >= 1024) setDevice("laptop");
        else if (window.innerWidth >= 768) setDevice("tablet");
        else if (window.innerWidth >= 320) setDevice("mobile");
        else return;
    }

    useEffect(() => {
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (device);
}