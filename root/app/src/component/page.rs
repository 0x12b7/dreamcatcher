use crate::*;

#[derive(Props)]
#[derive(Debug)]
#[derive(Clone)]
#[derive(PartialEq)]
pub struct PageProps {
    children: Element,
}

#[component]
pub fn Page(props: PageProps) -> Element {
    rsx! {
        div {
            display: "flex",
            flex_direction: "column",
            justify_content: "center",
            align_items: "center",
            width: "100vw",
            min_height: "100vh",
            overflow_x: "hidden",
            overflow_y: "auto",
            background: ColorPalette::Obsidian.to_hex(),
            {props.children}
        }
    }
}