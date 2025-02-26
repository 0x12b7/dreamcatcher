#[derive(Debug)]
#[derive(Clone)]
pub enum ColorPalette {
    TimberWorld,
    Platinum,
    Obsidian,
}

impl ColorPalette {
    pub fn to_hex(&self) -> String {
        match self {
            ColorPalette::TimberWorld => "#191919".to_owned(),
            ColorPalette::Platinum => "#D6D6D6".to_owned(),
            ColorPalette::Obsidian => "#191919".to_owned(),
        }
    }
}