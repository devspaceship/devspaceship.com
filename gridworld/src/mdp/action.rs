use std::hash::Hash;

use rand::prelude::*;

pub trait ActionTrait: Copy + Eq + Hash {
    fn get_all() -> Vec<Self>;

    fn get_random() -> Self {
        let actions = Self::get_all();
        let mut rng = thread_rng();
        *actions.choose(&mut rng).unwrap()
    }
}
