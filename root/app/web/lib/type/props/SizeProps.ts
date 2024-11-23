import type {SizeUnitProp} from "->web.lib";
import type {CssProps} from "->web.lib";

export type SizeProps = {
    width?: SizeUnitProp;
    height?: SizeUnitProp;
    aspectRatio?: CssProps["aspectRatio"];
};