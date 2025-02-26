use crate::*;

#[component]
pub fn RootRoute() -> Element {
    rsx! {
        div {
            RevealedSymbolSequence { duration: Duration::from_secs_f32(1.00f32), }
        }
    }
}