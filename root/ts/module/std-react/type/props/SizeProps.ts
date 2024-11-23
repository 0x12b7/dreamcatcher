import type {SizeUnitProp} from "src/web/lib/component/lib/react-util/Index";
import type {CssProps} from "src/web/lib/component/lib/react-util/Index";

export type SizeProps = {
    width?: SizeUnitProp;
    height?: SizeUnitProp;
    aspectRatio?: CssProps["aspectRatio"];
};