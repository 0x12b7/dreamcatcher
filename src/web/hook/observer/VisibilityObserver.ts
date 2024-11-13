import type {MutableRefObject} from "react";
import {useCallback} from "react";
import {useRef} from "react";

export type VisibilityObserverListener = () => void;
export type VisibilityObserverRef = IntersectionObserver | null;
export type VisibilityObserverCallback<T> = (element: T | null) => void;
export type VisibilityObserverPayload = {
    onVisible?: VisibilityObserverListener;
    onHidden?: VisibilityObserverListener;
}
export function useVisibilityObserver<T extends HTMLElement>({onVisible, onHidden}: VisibilityObserverPayload): VisibilityObserverCallback<T> {
    let observer: MutableRefObject<VisibilityObserverRef> = useRef<IntersectionObserver | null>(null);
    return (useCallback<VisibilityObserverCallback<T>>(element => {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver(entries => entries[0]?.isIntersecting ? onVisible && onVisible() : onHidden && onHidden());
        element && observer.current.observe(element);
        return;
    }, [onVisible, onHidden]));
}