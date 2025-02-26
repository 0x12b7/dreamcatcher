#![allow(non_snake_case)]
#![allow(clippy::let_with_type_underscore)]

mod component; 
mod route; 

pub use component::*;
pub use route::*;

pub use std::time::Duration;
pub use dioxus::prelude::*;
pub use dioxus::document::Title as DocumentTitle;
pub use dioxus::document::Link as DocumentLink;
pub use dioxus_motion::prelude::*;

#[derive(Debug)]
#[derive(Clone)]
#[derive(Routable)]
#[derive(PartialEq)]
#[rustfmt::skip]
enum Route {
    #[route("/")]
    RootRoute {}
}

#[component]
fn Main() -> Element {
    rsx! {
        DocumentTitle { "Dreamcatcher" }
        DocumentLink { rel: "stylesheet", href: asset!("/assets/main.css"), }
        DocumentLink { rel: "stylesheet", href: "https://fonts.cdnfonts.com/css/maria-2", }
        Page {
            Router::<Route> {}
        }
    }
}

fn main() {
    LaunchBuilder::new()
        .with_context(server_only! {
            
        })
        .launch(Main);
}