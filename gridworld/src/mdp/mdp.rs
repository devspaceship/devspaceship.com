use super::models::{Action, State};
use rand::prelude::*;

pub struct MDP<S, A>
where
    S: State,
    A: Action,
{
    states: Vec<S>,
    actions: Vec<A>,
    transition: fn(&S, &A) -> (S, f64),
    rng: ThreadRng,
}

impl<S, A> MDP<S, A>
where
    S: State,
    A: Action,
{
    pub fn new(states: Vec<S>, actions: Vec<A>, transition: fn(&S, &A) -> (S, f64)) -> Self {
        Self {
            states,
            actions,
            transition,
            rng: thread_rng(),
        }
    }

    fn get_random_state(&mut self) -> S {
        *self.states.choose(&mut self.rng).unwrap()
    }

    fn get_random_action(&mut self) -> A {
        *self.actions.choose(&mut self.rng).unwrap()
    }

    // TODO implement evaluate policy
    // pub fn evaluate_policy(&self, policy: impl Policy<S, A>) -> HashMap<S, f64> {
    //     let mut total_reward = 0.0;
    //     total_reward
    // }
}
