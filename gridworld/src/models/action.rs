use crate::mdp::ActionTrait;

#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
pub enum Action {
    Down,
    Left,
    Right,
    Up,
}

impl ActionTrait for Action {
    fn get_all() -> Vec<Self> {
        vec![Self::Down, Self::Left, Self::Right, Self::Up]
    }
}
