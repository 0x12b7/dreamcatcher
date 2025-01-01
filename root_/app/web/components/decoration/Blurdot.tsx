import * as WebLib from "->web.lib";

export type BlurdotProps = 
    & Omit<WebLib.ComponentProps<"div">,
        | "children"> 
    & {
    color0: string;
    color1: string;
};
export function Blurdot(props: BlurdotProps): WebLib.Component {
    let {style, ... more} = props;
    
    return <>
        <div
            style={{
                background: `radial-gradient(closest-side, ${props.color0}, ${props.color1})`,
                opacity: 0.10,
                ... style
            }}
            {... more}/>
    </>;
}