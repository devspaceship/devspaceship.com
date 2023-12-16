#[derive(Eq, Hash, PartialEq, Debug, Clone, Copy)]
pub enum Policy {
    Down,
    Left,
    Right,
    Up,
}

impl Policy {
    pub fn get_variants() -> Vec<Policy> {
        vec![Policy::Down, Policy::Left, Policy::Right, Policy::Up]
    }
}
