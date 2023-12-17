use rand::prelude::*;
use std::hash::Hash;

/// # Action
///
/// An action type must implement this trait.\
/// You can implement it on a custom enum for instance.
///
/// ## Example
///
/// ```
/// use gridworld::mdp::models::Action;
///
/// #[derive(Clone, Copy, PartialEq, Eq, Hash)]
/// enum ExampleAction {
///     Up,
///     Down,
///     Left,
///     Right,
/// }
///
/// impl Action for ExampleAction {}
/// ```
pub trait Action: Copy + Eq + Hash {}

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
