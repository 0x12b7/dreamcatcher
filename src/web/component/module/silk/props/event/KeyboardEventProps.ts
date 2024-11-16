import type {KeyboardEventHandler} from "react";

export type KeyboardEventProps = {
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
    onKeyUp?: KeyboardEventHandler<HTMLDivElement>;
};