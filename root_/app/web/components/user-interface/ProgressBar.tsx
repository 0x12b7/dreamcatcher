import * as WebLib from "->web.lib";
import * as ColorPalette from "->web.color-palette";

export type ProgressBarProps =
    & WebLib.SizeProps
    & WebLib.SizeShorthandProps
    & WebLib.SizeClampProps
    & WebLib.SizeClampShorthandProps
    & WebLib.AnimationProps
    & {
    progress?: number;
};
export function ProgressBar(props: ProgressBarProps): WebLib.Component {
    props.progress ??= 0;
    let width = WebLib.useSpring(() => ({width: `${props.progress}%`}));

    WebLib.useEffect(() => {
        width[1].start({width: `${props.progress}%`, ... props.animation});
        return;
    }, [props.progress]);

    return <>
        <div /// container
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: props.w ?? props.width,
                height: props.h ?? props.height,
                aspectRatio: props.aspectRatio,
                minWidth: props.minW ?? props.minWidth,
                maxWidth: props.maxW ?? props.maxWidth,
                minHeight: props.minH ?? props.minHeight,
                maxHeight: props.maxH ?? props.maxHeight,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: ColorPalette.TIMPERWOLD,
                position: "relative"
            }}>
            <WebLib.animated.div /// bar
                style={{
                    position: "absolute",
                    background: stripe("red", "purple", undefined, undefined, undefined, "0 0"),
                    height: "100%",
                    ... width[0]
                }}/>
        </div>
    </>;
}

function stripe(
    color0: string,
    color1: string,
    width: number = 10,
    gap: number = 10,
    angle: number = 45,
    position: string = "0 0"): string {
    return `repeating-linear-gradient(${angle}deg, ${color0}, ${color0} ${width}px, ${color1} ${width}px, ${color1} ${width + gap}px), ${position}`;
}