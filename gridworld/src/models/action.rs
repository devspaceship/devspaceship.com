use crate::mdp::Action;

#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
pub enum GridworldAction {
    Down,
    Left,
    Right,
    Up,
}

impl Action for GridworldAction {
    fn get_all() -> Vec<Self> {
        vec![Self::Down, Self::Left, Self::Right, Self::Up]
    }
}
