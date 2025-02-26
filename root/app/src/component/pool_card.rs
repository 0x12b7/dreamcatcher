use crate::*;

#[component]
pub fn PoolCard() -> Element {
    rsx! {
        div {
            display: "flex",
            flex_direction: "column",
            justify_content: "center",
            align_items: "center",
            "Card"
        }
    }
}