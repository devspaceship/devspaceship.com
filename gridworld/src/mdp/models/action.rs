use rand::prelude::*;
use std::hash::Hash;

/// This trait represents an action in the MDP.\
/// You can use it by implementing it on an enum representing the different possible actions.
pub trait Action: Copy + Eq + Hash {}

/// This struct represents the action space of an MDP.\
/// It contains a list of all possible actions.
pub struct ActionSpace<A>
where
    A: Action,
{
    actions: Vec<A>,
    rng: ThreadRng,
}

impl<A> ActionSpace<A>
where
    A: Action,
{
    /// Creates a new action space from a list of actions.
    /// The list must not be empty.
    pub fn new(actions: Vec<A>) -> Self {
        assert!(actions.len() > 0, "Action space must not be empty.");
        Self {
            actions,
            rng: thread_rng(),
        }
    }

    /// Returns a random action from the action space.
    pub fn get_random_action(&mut self) -> A {
        *self.actions.choose(&mut self.rng).unwrap()
    }
}
