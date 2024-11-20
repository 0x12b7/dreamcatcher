import * as Silk from "@silk";

export type FlexboxProps =
    & Silk.SizeProps
    & Silk.SizeShorthandProps
    & Silk.SizeClampProps
    & Silk.SizeClampShorthandProps
    & Omit<Silk.SpacingProps,
        | "marginTrim">
    & Silk.SpacingShorthandProps
    & Pick<Silk.JusifyProps, 
        | "justifyContent">
    & Pick<Silk.AlignmentProps,
        | "alignContent"
        | "alignItems"
        | "alignSelf">
    & Silk.FlexProps
    & Silk.ParentProps
    & {};
export function Flexbox(props: FlexboxProps): Silk.Component {
    props.flexDirection ??= "column";
    props.justifyContent ??= "center";
    props.alignItems ??= "center";

    return <>
        <div
            style={{
                display: "flex",
                flex: props.flex,
                flexBasis: props.flexBasis,
                flexDirection: props.flexDirection,
                flexFlow: props.flexFlow,
                flexGrow: props.flexGrow,
                flexShrink: props.flexShrink,
                flexWrap: props.flexWrap,
                justifyContent: props.justifyContent,
                alignContent: props.alignContent,
                alignItems: props.alignItems,
                alignSelf: props.alignSelf,
                width: props.w ?? props.width,
                height: props.h ?? props.height,
                minWidth: props.minW ?? props.minWidth,
                maxWidth: props.maxW ?? props.maxWidth,
                minHeight: props.minH ?? props.minHeight,
                maxHeight: props.maxH ?? props.maxHeight,
                padding: props.p ?? props.padding,
                
            }}>
            {props.children}
        </div>
    </>;
}