#[derive(Eq, Hash, PartialEq, Debug, Clone, Copy)]
pub enum Action {
    Down,
    Left,
    Right,
    Up,
}

impl Action {
    pub fn get_all() -> Vec<Action> {
        vec![Action::Down, Action::Left, Action::Right, Action::Up]
    }
}
