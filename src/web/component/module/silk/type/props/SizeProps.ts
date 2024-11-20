import type {SizeUnitProp} from "@silk";
import type {CssProps} from "@silk";

export type SizeProps = {
    width?: SizeUnitProp;
    height?: SizeUnitProp;
    aspectRatio?: CssProps["aspectRatio"];
};