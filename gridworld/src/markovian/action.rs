use rand::prelude::*;

pub trait ActionProvider {
    type Action: Copy;

    fn get_all() -> Vec<Self::Action>;

    fn get_random() -> Self::Action {
        let actions = Self::get_all();
        let mut rng = rand::thread_rng();
        *actions.choose(&mut rng).unwrap()
    }
}
