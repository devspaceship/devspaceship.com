use super::models::{Action, ActionSpace, State, StateSpace};
use rand::prelude::*;

#[allow(dead_code)]
pub struct MDP<S, A>
where
    S: State,
    A: Action,
{
    state_space: StateSpace<S>,
    action_space: ActionSpace<A>,
    transition: fn(&S, &A) -> (S, f64),
    rng: ThreadRng,
}

impl<S, A> MDP<S, A>
where
    S: State,
    A: Action,
{
    pub fn new(
        state_space: StateSpace<S>,
        action_space: ActionSpace<A>,
        transition: fn(&S, &A) -> (S, f64),
    ) -> Self {
        Self {
            state_space,
            action_space,
            transition,
            rng: thread_rng(),
        }
    }
}
