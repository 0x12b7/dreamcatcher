import type {CssProps} from "@silk";

export type StackProps = {
    direction?: CssProps["flexDirection"];
    primaryAlignment?: CssProps["justifyContent"];
    seondaryAlignment?: CssProps["alignItems"];
    gap?: CssProps["gap"];
};