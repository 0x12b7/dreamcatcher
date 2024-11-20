import * as Silk from "@silk";

export type ImageProps = 
    & Silk.SizeProps
    & Silk.SizeShorthandProps 
    & Silk.BackgroundProps
    & Silk.ParentProps
    & {
    url: string;
};
export function Image(props: ImageProps): Silk.Component {
    props.backgroundImage ??= `url(${props.url})`;
    props.backgroundPositionX ??= "center";
    props.backgroundPositionY ??= "center";
    props.backgroundRepeat ??= "no-repeat";
    props.backgroundSize ??= "contain";
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: props.background,
                backgroundAttachment: props.backgroundAttachment,
                backgroundBlendMode: props.backgroundBlendMode,
                backgroundClip: props.backgroundClip,
                backgroundColor: props.backgroundColor,
                backgroundImage: props.backgroundImage,
                backgroundOrigin: props.backgroundOrigin,
                backgroundPosition: props.backgroundPosition,
                backgroundPositionX: props.backgroundPositionX,
                backgroundPositionY: props.backgroundPositionY,
                backgroundRepeat: props.backgroundRepeat,
                backgroundSize: props.backgroundSize
            }}>
            {props.children}
        </div>
    </>;
}