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
                flexGrow: 1
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <NavButton
                    to="/">
                    <>01</>
                    <>HOME</>
                </NavButton>
            </div>
        </div>
    </>;
}