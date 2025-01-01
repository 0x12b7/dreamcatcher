import {easings as Easings} from "react-spring";
import * as WebLib from "->web.lib";
import * as ColorPalette from "->web.color-palette";

export type NavButtonProps = {
    to: string;
    children: [WebLib.Component, WebLib.Component];
};
export function NavButton(props: NavButtonProps): WebLib.Component {
    let spacing: number = 5;
    let gap0: number = 10;
    let gap1: number = spacing;
    let padding0: number = 0;
    let padding1: number = spacing / 2;
    let [gap, setGap] = 
        WebLib.useSpring(() => ({
            gap: gap0,
            paddingLeft: padding0,
            paddingRight: padding0,
            config: {
                duration: 500,
                easing: Easings.easeInOutElastic
            }
        }));

    return <>
        <WebLib.Link
            to={props.to}>
            <WebLib.animated.div
                onMouseEnter={() => setGap.start({gap: gap1, paddingLeft: padding1, paddingRight: padding1})}
                onMouseLeave={() => setGap.start({gap: gap0, paddingLeft: padding0, paddingRight: padding0})}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: WebLib.rho(5n),
                    fontWeight: "normal",
                    fontFamily: "departure-mono",
                    color: ColorPalette.TIMPERWOLD,
                    pointerEvents: "auto",
                    cursor: "pointer",
                    ... gap
                }}>
                <div
                    style={{
                        color: ColorPalette.NEON_PURPLE
                    }}>
                    {props.children[0]}
                </div>
                <div>
                    {props.children[1]}
                </div>
            </WebLib.animated.div>
        </WebLib.Link>
    </>;
}