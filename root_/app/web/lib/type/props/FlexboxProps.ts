import * as WebLib from "->web.lib";

export type FlexboxProps =
    & WebLib.SizeProps
    & WebLib.SizeShorthandProps
    & WebLib.SizeClampProps
    & WebLib.SizeClampShorthandProps
    & Omit<WebLib.SpacingProps,
        | "marginTrim">
    & WebLib.SpacingShorthandProps
    & Pick<WebLib.JusifyProps, 
        | "justifyContent">
    & Pick<WebLib.AlignmentProps,
        | "alignContent"
        | "alignItems"
        | "alignSelf">
    & WebLib.FlexProps
    & WebLib.ParentProps
    & {};