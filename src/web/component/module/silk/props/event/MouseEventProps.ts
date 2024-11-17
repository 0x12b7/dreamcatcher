import type {MouseEventHandler} from "react";

export type MouseEventProps<T extends Element> = {
    onClick?: MouseEventHandler<T>;
    onContextMenu?: MouseEventHandler<T>;
    onDoubleClick?: MouseEventHandler<T>;
    onMouseDown?: MouseEventHandler<T>;
    onMouseEnter?: MouseEventHandler<T>;
    onMouseLeave?: MouseEventHandler<T>;
    onMouseMove?: MouseEventHandler<T>;
    onMouseOut?: MouseEventHandler<T>;
    onMouseOver?: MouseEventHandler<T>;
    onMouseUp?: MouseEventHandler<T>;
};