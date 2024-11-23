import * as WebLib from "->web.lib";
import * as ColorPalette from "->web.color-palette";

export type NavButtonProps = {
    to: string;
    children: [WebLib.Component, WebLib.Component];
};
export function NavButton(props: NavButtonProps): WebLib.Component {
    let gap0: number = 10;
    let gap1: number = 5;
    let [gap, setGap] = 
        WebLib.useSpring(() => ({
            gap: gap0
        }));

    return <>
        <WebLib.Link
            to={props.to}>
            <WebLib.animated.div
                onMouseEnter={() => setGap.start({gap: gap1})}
                onMouseLeave={() => setGap.start({gap: gap0})}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: WebLib.rho(2n),
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