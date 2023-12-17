use crate::markovian::ActionProvider;

#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
pub enum Action {
    Down,
    Left,
    Right,
    Up,
}

impl ActionProvider for Action {
    type Action = Self;

    fn get_all() -> Vec<Self::Action> {
        vec![Action::Down, Action::Left, Action::Right, Action::Up]
    }
}
