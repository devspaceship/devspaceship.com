use rand::prelude::*;

#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
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

    pub fn get_random() -> Action {
        let actions = Action::get_all();
        let mut rng = rand::thread_rng();
        actions.choose(&mut rng).unwrap().clone()
    }
}
