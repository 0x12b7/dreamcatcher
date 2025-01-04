import type { Device } from "@root";
import type { ReactNode } from "react";
import type { CStackProps } from "@root";
import { CStack } from "@root";
import { useDevice } from "@root";

export type ResponsivePageProps =
    & CStackProps
    & {};

export function ResponsivePage(props: ResponsivePageProps): ReactNode {
    let { style, children, ... more } = props;
    let device: Device = useDevice();

    return <>
        <CStack
            style={{
                width: "100vw",
                minHeight: "100vh",
                ... style
            }}
            { ... more }>
            <CStack
                style={{
                    width:
                        device === "DEVICE.LAPTOP" ? 1024 :
                        device === "DEVICE.TABLET" ? 768 :
                        device === "DEVICE.MOBILE" ? 320 :
                        undefined
                }}>
                { children }
            </CStack>
        </CStack>
    </>;
}