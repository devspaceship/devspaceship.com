use std::collections::HashMap;

use crate::{config::Config, mdp::MDP};

pub type StateValue<S> = HashMap<S, f64>;
pub type Policy<S, A> = HashMap<S, A>;

pub fn policy_evaluation<M>(
    mdp: &M,
    config: &Config,
    policy: &Policy<M::State, M::Action>,
    initial_state_value: Option<StateValue<M::State>>,
) -> StateValue<M::State>
where
    M: MDP,
{
    let mut state_value = initial_state_value.unwrap_or(mdp.get_state_value());
    let early_stop = config.iterations_before_improvement.is_some();
    let mut iteration = 0;
    loop {
        iteration += 1;
        let mut delta: f64 = 0.0;
        for state in mdp.get_states() {
            let action = policy.get(&state).unwrap();
            let (next_state, reward) = mdp.transition(&state, &action);
            let next_state_value = state_value[&next_state];
            let new_state_value = reward + config.discount_factor * next_state_value;
            delta = delta.max((new_state_value - state_value[&state]).abs());
            state_value.insert(state, new_state_value);
        }
        if delta < 1e-5
            || (early_stop && iteration == config.iterations_before_improvement.unwrap())
        {
            break;
        }
    }
    state_value
}
