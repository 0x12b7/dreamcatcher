import {NavButton} from "./NavButton";
import * as WebLib from "->web.lib";
import * as ColorPalette from "->web.color-palette";

export function Nav(): WebLib.Component {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                paddingTop: 20,
                paddingBottom: 20
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 20
                }}>
                <NavButton
                    to="/">
                    <>01</>
                    <>HOME</>
                </NavButton>
                <NavButton
                    to="/">
                    <>02</>
                    <>TREASURY</>
                </NavButton>
            </div>
        </div>
    </>;
}