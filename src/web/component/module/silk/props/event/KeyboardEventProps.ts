import type {KeyboardEventHandler} from "react";

export type KeyboardEventProps<T extends Element> = {
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
    onKeyUp?: KeyboardEventHandler<HTMLDivElement>;
};