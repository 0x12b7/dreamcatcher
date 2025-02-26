use crate::*;

#[derive(Props)]
#[derive(Debug)]
#[derive(Clone)]
#[derive(PartialEq)]
pub struct RevealedSymbolSequenceProps {
    #[props(default = Duration::from_secs_f32(0.00f32))]
    pub duration: Duration,

    #[props(default = 1.00f32)]
    pub target_opacity: f32,

    #[props(default = 0.00f32)]
    pub initial_opacity0: f32,

    #[props(default = 0.00f32)]
    pub initial_opacity1: f32,

    #[props(default = 0.00f32)]
    pub initial_opacity2: f32,

    #[props(default = Duration::from_secs_f32(0.00f32))]
    pub delay0: Duration,

    #[props(default = Duration::from_secs_f32(0.20f32))]
    pub delay1: Duration,

    #[props(default = Duration::from_secs_f32(0.40f32))]
    pub delay2: Duration,

    #[props(default = ColorPalette::Platinum.to_hex())]
    pub color: String,

    #[props(default = "➽".to_owned())]
    pub char_symbol: String,
}

#[component]
pub fn RevealedSymbolSequence(props: RevealedSymbolSequenceProps) -> Element {
    let mut _opacity0: _ = use_motion(props.initial_opacity0);
    let mut _opacity1: _ = use_motion(props.initial_opacity1);
    let mut _opacity2: _ = use_motion(props.initial_opacity2);

    use_effect(move || {
        let spring: Tween = Tween::new(props.duration);
        let mode: AnimationMode = AnimationMode::Tween(spring);
        let config0: AnimationConfig = AnimationConfig::new(mode).with_delay(props.delay0);
        let config1: AnimationConfig = AnimationConfig::new(mode).with_delay(props.delay1);
        let config2: AnimationConfig = AnimationConfig::new(mode).with_delay(props.delay2);
        _opacity0.animate_to(props.target_opacity, config0);
        _opacity1.animate_to(props.target_opacity, config1);
        _opacity2.animate_to(props.target_opacity, config2);
    });

    rsx! {
        div {
            display: "flex",
            flex_direction: "row",
            justify_content: "center",
            align_items: "center",
            gap: "5px",
            _Symbol { color: props.color.to_owned(), opacity: "{_opacity0.get_value()}", symbol: "{props.char_symbol}", }
            _Symbol { color: props.color.to_owned(), opacity: "{_opacity1.get_value()}", symbol: "{props.char_symbol}", }
            _Symbol { color: props.color.to_owned(), opacity: "{_opacity2.get_value()}", symbol: "{props.char_symbol}", }
        }
    }
}

#[derive(Props)]
#[derive(Debug)]
#[derive(Clone)]
#[derive(PartialEq)]
struct _SymbolProps {
    color: String,
    opacity: String,
    symbol: String,
}

#[component]
fn _Symbol(props: _SymbolProps) -> Element {
    rsx! {
        div {
            display: "flex",
            flex_direction: "row",
            justify_content: "center",
            align_items: "center",
            pointer_events: "none",
            color: props.color,
            opacity: props.opacity,
            "{props.symbol}"
        }
    }
}