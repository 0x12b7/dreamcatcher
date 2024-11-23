import type {CssProps} from "src/web/lib/component/lib/react-util/Index";

export type StackProps = {
    direction?: CssProps["flexDirection"];
    primaryAlignment?: CssProps["justifyContent"];
    seondaryAlignment?: CssProps["alignItems"];
    gap?: CssProps["gap"];
};