import {easings as Easings} from "react-spring";
import * as WebLib from "->web.lib";
import * as WebComponents from "->web.components";
import * as ColorPalette from "->web.color-palette";

export function Home(): WebLib.Component {
    let progress = WebLib.useState(0);

    WebLib.useEffect(() => {
        setTimeout(() => {
            progress[1](75);
        }, 2000);
    }, []);

    return <>
        <WebComponents.ResponsivePage>
            <div /// slide 0
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                }}>
                <WebComponents.Nav/>
                <div /// content
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        flexGrow: 1
                    }}>
                    <WebComponents.ProgressBar
                        progress={progress[0]}
                        w={200}
                        aspectRatio={8 / 1}
                        animation={{
                            tension: 0,
                            friction: 0
                        }}/>
                </div>
            </div>
        </WebComponents.ResponsivePage>
    </>;
}