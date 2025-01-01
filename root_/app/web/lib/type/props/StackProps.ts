import type {CssProps} from "->web.lib";

export type StackProps = {
    direction?: CssProps["flexDirection"];
    primaryAlignment?: CssProps["justifyContent"];
    seondaryAlignment?: CssProps["alignItems"];
    gap?: CssProps["gap"];
};