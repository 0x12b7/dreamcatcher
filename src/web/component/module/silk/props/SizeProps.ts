import type {SizeUnit} from "@silk";
import type {AspectRatio} from "@silk";

export type SizeProps = {
    w?: SizeUnit;
    h?: SizeUnit;
    p?: SizeUnit;
    m?: SizeUnit;
    minW?: SizeUnit;
    maxW?: SizeUnit;
    minH?: SizeUnit;
    maxH?: SizeUnit;
    pt?: SizeUnit;
    pr?: SizeUnit;
    pb?: SizeUnit;
    pl?: SizeUnit;
    mt?: SizeUnit;
    mr?: SizeUnit;
    mb?: SizeUnit;
    ml?: SizeUnit;
    aspectRatio?: AspectRatio;
};