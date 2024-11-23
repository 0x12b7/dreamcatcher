import * as Silk from "src/web/lib/component/lib/react-util/Index";

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