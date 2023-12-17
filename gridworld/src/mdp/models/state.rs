use std::hash::Hash;

/// This trait represents a state in the MDP.\
/// You can use it by implementing it on a custom struct for instance.
pub trait State: Hash + Eq {}

/// This struct represents the state space of an MDP.\
/// It contains a list of all possible states.
#[allow(dead_code)]
pub struct StateSpace<S>
where
    S: State,
{
    states: Vec<S>,
}

impl<S> StateSpace<S>
where
    S: State,
{
    /// Creates a new state space from a list of states.
    pub fn new(states: Vec<S>) -> Self {
        Self { states }
    }

    // pub fn get_all(&self) -> &Vec<S> {
    //     &self.states
    // }
}
