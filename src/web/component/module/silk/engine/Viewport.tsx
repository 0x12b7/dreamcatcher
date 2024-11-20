import type {ReactNode} from "react";
import type {PositionProps, SizeProps} from "@silk";
import type {AnimationProps} from "@silk";
import type {ParentProps} from "@silk";
import {Option} from "@seal";
import {Some} from "@seal";
import {None} from "@seal";
import {animated} from "react-spring";
import {createContext as Context} from "react";
import {useSpring} from "react-spring";
import {useEffect} from "react";
import {useContext} from "react";

export type ViewportContextProps = {

};
export const ViewportContext = Context<Option<ViewportContextProps>>(None);

export type ViewportProps = 
    & SizeProps
    & Omit<PositionProps, "z">
    & AnimationProps
    & ParentProps
    & {};
export function Viewport(props: ViewportProps): ReactNode {
    let [position, setPosition] = 
        useSpring(() => ({
            transform: `translate(${props.x}, ${props.y})`
        }));

    useEffect(() => {
        setPosition.start({transform: `translate(${props.x}, ${props.y})`, ... props.animation});
        return;
    }, [props.x, props.y]);

    

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflowX: "hidden",
                overflowY: "hidden",
                width: props.w,
                minWidth: props.minW,
                maxWidth: props.maxW,
                height: props.h,
                minHeight: props.minH,
                maxHeight: props.maxH,
                padding: props.p,
                paddingLeft: props.pl,
                paddingRight: props.pr,
                paddingTop: props.pt,
                paddingBottom: props.pb,
                margin: props.m,
                marginLeft: props.ml,
                marginRight: props.mr,
                marginTop: props.mt,
                marginBottom: props.mb,
                aspectRatio: props.aspectRatio
            }}>
            <ViewportContext.Provider
                value={Some({

                })}>
                <animated.div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        ... position
                    }}>
                    {props.children}
                </animated.div>
            </ViewportContext.Provider>
        </div>
    </>;
}

/**
 * @dev A location where the viewport will move to and place in its center.
 */
export function ViewportGoto() {

    return <>
    
    </>;
}

/**
 * @dev an area where the viewport must be kept within. The viewport will not leave
 *      this area and will stop if it will view content outside this region.
 */
/**
 * responsive
 * @flag as the viewport shrinks or changes shape, the region will match the ratio
 *       in which the viewpoint changes such that all elements are proportional to
 *       the viewport and shrinking or increasing the viewport does not expose any
 *       content outside of where its at.
 * 
 * @dev omit w or h to be the same size as the parent viewport.
 */
export function ViewportRegion() {
    let c: Option<ViewportContextProps> = useContext(ViewportContext);


}


/**
 * where w = 600 & vrw = 1200
 * if w = 300 -> vrw = 600
 * the x axis location of the viewpoint must be offset
 * 
 * the same for the y axis
 */

<Viewport
    w={600}
    h={800}
    pr={20}
    pl={20}
    maxH={600}
    x={600}
    y={0}
    goto="some-random-key"
    aspectRatio={1 / 1}
    animation={{
        duration: 1000
    }}>
    <ViewportRegion
        responsive>
        <ViewportGoto
            key="some-random-key"
            w={500}
            h={500}>
            HELLO_WORLD
        </ViewportGoto>
    </ViewportRegion>
</Viewport>