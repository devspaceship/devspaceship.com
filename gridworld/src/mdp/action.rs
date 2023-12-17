use std::hash::Hash;

use rand::prelude::*;

/// This trait is used to represent an action in the MDP.
/// It is usually implemented on an enum representing the different possible actions.
pub trait Action: Copy + Eq + Hash {
    fn get_all() -> Vec<Self>;

    fn get_random() -> Self {
        let actions = Self::get_all();
        let mut rng = thread_rng();
        *actions.choose(&mut rng).unwrap()
    }
}
